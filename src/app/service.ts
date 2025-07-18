import {Injectable, signal, Signal} from '@angular/core';
import {Question, SET_SIZE} from './model';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  private allQuestions: Question[] = [];

  // Create a signal to hold the questions
  private questionsSignal = signal<Question[]>([]);

  constructor(private http: HttpClient) {
    this.loadQuestions();
  }

  getQuestions(): Signal<Question[]> {
    return this.questionsSignal.asReadonly();
  }

  createNewQuestionSet(): void {
    const randomizedQuestions = [...this.allQuestions].sort(() => 0.5 - Math.random());
    this.questionsSignal.set(randomizedQuestions.slice(0, SET_SIZE));
  }


  private loadQuestions(): void {
    this.http.get<Question[]>('assets/questions.json')
      .pipe(
        tap(questions => {
          this.allQuestions = questions;
          // Initialize the first set of 20 random questions
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
