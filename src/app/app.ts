import {Component, OnInit, signal, Signal} from '@angular/core';
import {Question, SET_SIZE} from './model';
import {QuestionsService} from './service';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms';
import {fadeInOut, optionAnimation, staggerOptions} from './animations';

export interface WrongAnswer {
  question: string;
  selectedOption: string;
  correctOption: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatProgressBarModule, FormsModule],
  animations: [fadeInOut, optionAnimation, staggerOptions]
})
export class AppComponent implements OnInit {
  // Signals
  questions!: Signal<Question[]>;
  showScoreSummary = signal(false);
  showAnswerSheet = signal(false);
  isLoading = signal(true);

  // Queue positioning
  currentQuestionIndex = 0;
  selectedUserOption: number | null = null;
  // Score
  questionsAnswered = 0;
  score = 0;
  wrongAnswers: WrongAnswer[] = [];

  setSize = SET_SIZE;
  readonly OPTION_LABELS = ['A', 'B', 'C', 'D'];

  constructor(private service: QuestionsService) {
  }

  ngOnInit(): void {
    this.questions = this.service.getQuestions();
    // Watch for questions to be loaded
    const checkLoaded = setInterval(() => {
      if (this.questions().length > 0) {
        this.isLoading.set(false);
        clearInterval(checkLoaded);
      }
    }, 50);
  }

  get progressValue(): number {
    return (this.questionsAnswered / this.setSize) * 100;
  }

  selectOption(index: number): void {
    if (!this.showAnswerSheet()) {
      this.selectedUserOption = index;
      this.showAnswerSheet.set(true);

      // Update score based on answer correctness
      if (this.isCorrectAnswer()) {
        this.score++;
      } else {
        const q = this.getCurrentQuestion()!;
        this.wrongAnswers.push({
          question: q.question,
          selectedOption: q.options[index],
          correctOption: q.options[q.correctOptionIndex]
        });
      }
    }
  }

  nextQuestion(): void {
    this.questionsAnswered++;
    const isLastQuestion = this.questionsAnswered >= SET_SIZE;
    if (isLastQuestion) {
      this.showScoreSummary.set(true);
    } else {
      this.currentQuestionIndex++;
      this.showAnswerSheet.set(false);
      this.selectedUserOption = null;
    }
  }

  isCorrectAnswer(): boolean {
    if (this.selectedUserOption === null) return false;
    const currentQuestions = this.questions();
    if (currentQuestions.length === 0) return false;

    return this.selectedUserOption === currentQuestions[this.currentQuestionIndex].correctOptionIndex;
  }

  startNewSet(): void {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questionsAnswered = 0;
    this.showAnswerSheet.set(false);
    this.selectedUserOption = null;
    this.showScoreSummary.set(false);
    this.wrongAnswers = [];

    this.service.createNewQuestionSet();
  }

  getCurrentQuestion(): Question | null {
    const currentQuestions = this.questions();
    return currentQuestions.length > this.currentQuestionIndex ? currentQuestions[this.currentQuestionIndex] : null;
  }
}
