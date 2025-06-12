import { Component, Input, Output, EventEmitter } from '@angular/core';
import { materialImports } from '../../../material';
import { Question } from '../../../../core/models/question.model';
import { AnswerOptionComponent } from '../answer-option/answer-option.component';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [materialImports, AnswerOptionComponent],
  template: `
    <mat-card *ngIf="question">
      <div><strong>{{ question.category }}</strong></div>
      <div [innerHTML]="question.question"></div>
      <div>
        <app-answer-option
          *ngFor="let opt of question.all_answers"
          [option]="opt"
          (selectOption)="onSelect(opt)">
        </app-answer-option>
      </div>
    </mat-card>
  `
})
export class QuestionCardComponent {
  @Input() question!: Question;
  @Output() answer = new EventEmitter<string>();

  onSelect(opt: string) {
    this.answer.emit(opt);
  }
}

