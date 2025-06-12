import { Component, Input, Output, EventEmitter } from '@angular/core';
import { materialImports } from '../../../material';

@Component({
  selector: 'app-answer-option',
  standalone: true,
  imports: [materialImports],
  template: `
    <button mat-raised-button color="primary" class="answer-option"
      (click)="select()">{{ option }}</button>
  `,
  styles: [`
    .answer-option { margin: 0.5rem 0.5rem 0 0; }
  `]
})
export class AnswerOptionComponent {
  @Input() option!: string;
  @Output() selectOption = new EventEmitter<string>();
  select() { this.selectOption.emit(this.option); }
}
