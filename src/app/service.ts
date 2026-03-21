import {effect, inject, Injectable, signal, Signal} from '@angular/core';
import {Question, SET_SIZE} from './model';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';
import {TranslationService} from './translation.service';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  private http = inject(HttpClient);
  private translationService = inject(TranslationService);

  private allQuestions: Question[] = [];
  private questionsSignal = signal<Question[]>([]);

  constructor() {
    effect(() => {
      const lang = this.translationService.lang();
      this.loadQuestions(lang);
    });
  }

  getQuestions(): Signal<Question[]> {
    return this.questionsSignal.asReadonly();
  }

  createNewQuestionSet(): void {
    const randomizedQuestions = [...this.allQuestions].sort(() => 0.5 - Math.random());
    this.questionsSignal.set(randomizedQuestions.slice(0, SET_SIZE));
  }

  private loadQuestions(lang: string): void {
    this.http.get<Question[]>(`assets/questions-${lang}.json`)
      .pipe(
        tap(questions => {
          this.allQuestions = questions;
          this.createNewQuestionSet();
        }),
        catchError(error => {
          console.error('Error loading questions:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
