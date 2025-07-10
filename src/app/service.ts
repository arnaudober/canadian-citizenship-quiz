import {Injectable, signal, Signal} from '@angular/core';
import {Flashcard} from './model';
import {HttpClient} from '@angular/common/http';
import {catchError, finalize, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FlashcardService {
  private allFlashcards: Flashcard[] = [];
  private isLoading = true;

  // Create a signal to hold the random set of flashcards
  private flashcardsSignal = signal<Flashcard[]>([]);

  constructor(private http: HttpClient) {
    this.loadFlashcards();
  }

  getRandomSet(count = 20): Signal<Flashcard[]> {
    // If data is already loaded, immediately generate a random set
    if (!this.isLoading && this.allFlashcards.length > 0) {
      this.generateRandomSet(count);
    }

    // Always return the signal - it will be updated when data loads
    return this.flashcardsSignal.asReadonly();
  }

  private generateRandomSet(count: number): void {
    const randomSet = [...this.allFlashcards]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(count, this.allFlashcards.length));

    this.flashcardsSignal.set(randomSet);
  }

  private loadFlashcards(): void {
    this.http.get<Flashcard[]>('assets/flashcards.json')
      .pipe(
        tap(flashcards => {
          this.allFlashcards = flashcards;
          // Generate the random set as soon as data is loaded
          this.generateRandomSet(20);
        }),
        catchError(error => {
          console.error('Error loading flashcards:', error);
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
