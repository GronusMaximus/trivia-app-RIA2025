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
    @Input() duration = 30;  // segundos
    @Output() finished = new EventEmitter<void>();

    timeLeft: number = 0;
    private timerId?: any;

    ngOnInit() {
        this.timeLeft = this.duration;
        this.timerId = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.finished.emit();
                clearInterval(this.timerId);
            }
        }, 1000);
    }

    ngOnDestroy() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }
}
