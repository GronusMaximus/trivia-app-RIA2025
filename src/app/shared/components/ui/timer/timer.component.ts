import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { materialImports } from '../../../material';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [materialImports],
  template: `
    <div class="timer">
      <mat-icon>timer</mat-icon>
      <span>{{ timeLeft }}s</span>
    </div>
  `,
  styles: [`
    .timer {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      gap: 0.5rem;
    }
    mat-icon {
      font-size: 1.2em;
      vertical-align: middle;
    }
  `]
})
export class TimerComponent implements OnInit, OnDestroy {
  static resetTimer() {
    throw new Error('Method not implemented.');
  }
  @Input() duration = 15;
  @Output() finished = new EventEmitter<void>();
  @Output() tick = new EventEmitter<number>();

  timeLeft: number = 0;
  private timerId?: any;

  ngOnInit() {
    this.resetTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  public resetTimer(): void {
    this.clearTimer();
    this.timeLeft = this.duration;
    this.tick.emit(this.timeLeft);

    this.timerId = setInterval(() => {
      this.timeLeft--;
      this.tick.emit(this.timeLeft);

      if (this.timeLeft <= 0) {
        this.finished.emit();
        this.resetTimer(); // reinicia limpio al llegar a cero
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}