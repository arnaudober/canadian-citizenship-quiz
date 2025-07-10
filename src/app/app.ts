import {Component, OnInit} from '@angular/core';
import {Flashcard} from './model';
import {FlashcardService} from './service';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule]
})
export class AppComponent implements OnInit {
  cards: Flashcard[] = [];
  index = 0;
  showAnswer = false;

  constructor(private flashcardService: FlashcardService) {
  }

  ngOnInit(): void {
    this.startNewSet();
  }

  startNewSet(): void {
    this.cards = this.flashcardService.getRandomSet(20);
    this.index = 0;
    this.showAnswer = false;
  }

  revealAnswer(): void {
    if (!this.showAnswer) {
      this.showAnswer = true;
    }
  }

  goToNext(): void {
    if (this.index + 1 < this.cards.length) {
      this.index++;
      this.showAnswer = false;
    } else {
      this.startNewSet();
    }
  }
}
