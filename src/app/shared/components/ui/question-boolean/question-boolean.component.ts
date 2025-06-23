import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Question } from '../../../../core/models/question.model';

@Component({
  selector: 'app-question-boolean',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './question-boolean.component.html',
  styleUrls: ['./question-boolean.component.css']
})
export class QuestionBooleanComponent {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<string>();

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  onSelect(opt: string) {
    this.answer.emit(opt);
  }
}
  