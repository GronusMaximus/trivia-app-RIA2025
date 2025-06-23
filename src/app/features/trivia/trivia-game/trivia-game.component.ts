import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TriviaService } from '../../../core/services/trivia.service';
import { SettingsService } from '../../../core/services/settings.service';
import { GameControllerService } from '../../../core/services/game-controller.service';
import { TimerComponent } from '../../../shared/components/ui/timer/timer.component';
import { QuestionMultipleComponent } from '../../../shared/components/ui/question-multiple/question-multiple.component';
import { QuestionBooleanComponent } from '../../../shared/components/ui/question-boolean/question-boolean.component';
import { Question } from '../../../core/models/question.model';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TimerComponent,
    QuestionMultipleComponent,
    QuestionBooleanComponent
  ],
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit, OnDestroy {
  loading = true;
  errorMessage: string | null = null;
  question!: Question;
  timerDuration = 30;
  timeLeft: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private trivia: TriviaService,
    public settings: SettingsService,
    private gameController: GameControllerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;
    this.errorMessage = null;
    this.settings.resetGame();
    this.trivia.getToken()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: token => this.fetchQuestions(token),
        error: err => {
          this.errorMessage = err.message;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private fetchQuestions(token: string): void {
    this.trivia.getQuestions({
      amount: this.settings.amount,
      category: this.settings.categoryId || undefined,
      difficulty: this.settings.difficulty,
      type: this.settings.type,
      token
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: qs => {
          if (!qs || qs.length === 0) {
            this.errorMessage = 'No se encontraron preguntas.';
            this.loading = false;
            this.cdr.detectChanges();
          } else {
            this.settings.questions = qs;
            setTimeout(() => {
              this.loading = false;
              this.initGame();
              this.cdr.detectChanges();
            }, 0);
          }
        },
        error: err => {
          this.errorMessage = err.message;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private initGame(): void {
    this.gameController.init([...this.settings.questions]);
    this.gameController.question$
      .pipe(
        takeUntil(this.destroy$),
        filter((q): q is Question => q !== null)
      )
      .subscribe(q => {
        this.question = q;
        this.timeLeft = null;
        this.cdr.detectChanges();
      });
  }

  onTick(remaining: number): void {
    this.timeLeft = remaining;
    this.cdr.detectChanges();
  }

  onAnswer(answer: string): void {
    this.gameController.answer(answer);
  }

  onTimerEnd(): void {
    this.gameController.timerEnd();
  }

  retry(): void {
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
