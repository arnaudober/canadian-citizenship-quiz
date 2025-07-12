
import {Injectable, signal, Signal} from '@angular/core';
import {Question} from './model';
import {HttpClient} from '@angular/common/http';
import {catchError, finalize, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  private allQuestions: Question[] = [];
  private currentQueue: Question[] = [];
  private isLoading = true;

  // Create a signal to hold the questions
  private questionsSignal = signal<Question[]>([]);

  constructor(private http: HttpClient) {
    this.loadQuestions();
  }

  getQuestions(): Signal<Question[]> {
    return this.questionsSignal.asReadonly();
  }

  ensureQueueHasQuestions(): void {
    // If queue is empty, refill it with a new randomized set of all questions
    if (this.currentQueue.length === 0 && this.allQuestions.length > 0) {
      this.currentQueue = [...this.allQuestions].sort(() => 0.5 - Math.random());
      this.questionsSignal.set(this.currentQueue);
    }
  }

  private loadQuestions(): void {
    this.http.get<Question[]>('assets/questions.json')
      .pipe(
        tap(questions => {
          this.allQuestions = questions;
          // Initialize the queue with all questions in random order
          this.currentQueue = [...this.allQuestions].sort(() => 0.5 - Math.random());
          this.questionsSignal.set(this.currentQueue);
        }),
        catchError(error => {
          console.error('Error loading questions:', error);
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
