import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from './settings.service';
import { Question } from '../../core/models/question.model';

@Injectable({
    providedIn: 'root'
})
export class GameControllerService {
    private current = 0;
    private questions: Question[] = [];
    question$ = new BehaviorSubject<Question | null>(null);

    constructor(
        private settings: SettingsService,
        private router: Router
    ) { }

    init(questions: Question[]) {
        this.questions = questions;
        this.current = 0;
        this.emitQuestion();
    }

    answer(answer: string) {
        this.settings.userAnswers.push(answer);
        if (answer === this.questions[this.current].correct_answer) {
            this.settings.correctCount++;
        }
        this.next();
    }

    timerEnd() {
        this.settings.userAnswers.push('');
        this.next();
    }

    private next() {
        if (this.current < this.questions.length - 1) {
            this.current++;
            this.emitQuestion();
        } else {
            this.settings.finished = true;
            this.router.navigate(['/results']);
        }
    }

    private emitQuestion() {
        this.question$.next(this.questions[this.current]);
    }
}
