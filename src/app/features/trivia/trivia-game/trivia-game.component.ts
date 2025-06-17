import { TimerComponent } from '../../../shared/components/ui/timer/timer.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { materialImports } from '../../../shared/material';
import { TriviaService } from '../../../core/services/trivia.service';
import { SettingsService } from '../../../core/services/settings.service';
import { QuestionCardComponent } from '../../../shared/components/ui/question-card/question-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Question } from '../../../core/models/question.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [
    materialImports,
    QuestionCardComponent,
    TimerComponent, MatProgressSpinnerModule,
  ],
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {
  loading = true;
  current = 0;
  question?: Question;
  timerDuration = 30; // segundos

  constructor(
    private trivia: TriviaService,
    public settings: SettingsService, // <-- public para usar en el template
    private router: Router
  ) { }

  ngOnInit() {
    this.settings.resetGame();
    this.trivia.getToken().subscribe((token: string) => {
      this.trivia.getQuestions({
        amount: this.settings.amount,
        category: this.settings.categoryId || undefined,
        difficulty: this.settings.difficulty,
        type: this.settings.type,
        token
      }).subscribe((qs: any[]) => {
        this.settings.questions = qs;
        this.loading = false;
        this.setCurrentQuestion();
      });
    });
  }

  setCurrentQuestion() {
    this.question = this.settings.questions[this.current];
  }

  onAnswer(answer: string) {
    this.settings.userAnswers.push(answer);
    if (answer === this.question?.correct_answer) {
      this.settings.correctCount++;
    }
    if (this.current < this.settings.questions.length - 1) {
      this.current++;
      this.setCurrentQuestion();
    } else {
      this.settings.finished = true;
      this.router.navigate(['/results']);
    }
  }

  onTimerEnd() {
    this.settings.userAnswers.push('');
    if (this.current < this.settings.questions.length - 1) {
      this.current++;
      this.setCurrentQuestion();
    } else {
      this.settings.finished = true;
      this.router.navigate(['/results']);
    }
  }
}
