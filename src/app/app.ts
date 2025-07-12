
import {Component, OnInit, Signal} from '@angular/core';
import {Question} from './model';
import {QuestionsService} from './service';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, FormsModule]
})
export class AppComponent implements OnInit {
  questions!: Signal<Question[]>;
  currentIndex = 0;
  showAnswer = false;
  selectedOption: number | null = null;
  questionsAnswered = 0;
  score = 0;

  constructor(private questionsService: QuestionsService) {
  }

  ngOnInit(): void {
    this.questions = this.questionsService.getQuestions();
  }

  resetScore(): void {
    this.score = 0;
  }

  selectOption(index: number): void {
    if (!this.showAnswer) {
      this.selectedOption = index;
      this.showAnswer = true;
      this.questionsAnswered++;

      // Update score based on answer correctness
      if (this.isCorrectAnswer()) {
        this.score++;
      } else {
        this.score = Math.max(0, this.score - 1); // Prevent negative score if desired
      }

      // Automatically go to next question after a delay for both correct and incorrect answers
      // Use a shorter delay for correct answers, slightly longer for incorrect to allow time to see the correct answer
      const delay = this.isCorrectAnswer() ? 800 : 1500;
      setTimeout(() => this.goToNext(), delay);
    }

  }

  isCorrectAnswer(): boolean {
    if (this.selectedOption === null) return false;
    const currentQuestions = this.questions();
    if (currentQuestions.length === 0) return false;

    return this.selectedOption === currentQuestions[this.currentIndex].correctOptionIndex;
  }

  goToNext(): void {
    this.currentIndex++;
    // If we're reaching the end of our current questions, ensure we have more
    if (this.currentIndex >= this.questions().length - 5) {
      this.questionsService.ensureQueueHasQuestions();
    }

    this.showAnswer = false;
    this.selectedOption = null;
  }

  getCurrentQuestion(): Question | null {
    const currentQuestions = this.questions();
    return currentQuestions.length > this.currentIndex ? currentQuestions[this.currentIndex] : null;
  }
}
