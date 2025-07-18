import {Component, OnInit, signal, Signal} from '@angular/core';
import {Question, SET_SIZE} from './model';
import {QuestionsService} from './service';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {fadeInOut, optionAnimation, staggerOptions} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, FormsModule],
  animations: [fadeInOut, optionAnimation, staggerOptions]
})
export class AppComponent implements OnInit {
  // Signals
  questions!: Signal<Question[]>;
  showScoreSummary = signal(false);
  showAnswerSheet = signal(false);

  // Queue positioning
  currentQuestionIndex = 0;
  selectedUserOption: number | null = null;
  // Score
  questionsAnswered = 0;
  score = 0;

  setSize = SET_SIZE;

  constructor(private service: QuestionsService) {
  }

  ngOnInit(): void {
    this.questions = this.service.getQuestions();
  }

  selectOption(index: number): void {
    if (!this.showAnswerSheet()) {
      this.selectedUserOption = index;
      this.showAnswerSheet.set(true);
      this.questionsAnswered++;

      // Update score based on answer correctness
      if (this.isCorrectAnswer()) {
        this.score++;
      }

      const isLastQuestion = this.questionsAnswered >= SET_SIZE;
      const delay = this.isCorrectAnswer() ? 800 : 1500;

      setTimeout(() => {
        if (isLastQuestion) {
          this.showScoreSummary.set(true);
        } else {
          this.currentQuestionIndex++;
          this.showAnswerSheet.set(false);
          this.selectedUserOption = null;
        }
      }, delay);
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

    this.service.createNewQuestionSet();
  }

  getCurrentQuestion(): Question | null {
    const currentQuestions = this.questions();
    return currentQuestions.length > this.currentQuestionIndex ? currentQuestions[this.currentQuestionIndex] : null;
  }
}
