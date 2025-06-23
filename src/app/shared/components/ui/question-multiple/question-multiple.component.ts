import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../../core/models/question.model';

@Component({
  selector: 'app-question-multiple',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './question-multiple.component.html',
  styleUrls: ['./question-multiple.component.css']
})
export class QuestionMultipleComponent {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<string>();

  selectedOption: string | null = null;
  isCorrect: boolean | null = null;

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  onSelect(opt: string) {
    if (this.selectedOption !== null) {
      return;
    }
    this.selectedOption = opt;
    this.isCorrect = opt === this.question.correct_answer;
    setTimeout(() => {
      this.answer.emit(opt);
      this.selectedOption = null;
      this.isCorrect = null;
    }, 800);
  }
}
