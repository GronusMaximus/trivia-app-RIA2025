import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    categoryId: number | null = null;
    difficulty: string = 'easy';
    type: 'multiple' | 'boolean' = 'multiple';
    amount: number = 10;

    private _questions: readonly Question[] = [];
    get questions(): readonly Question[] {
        return this._questions;
    }
    set questions(qs: readonly Question[]) {
        this._questions = qs ?? [];
    }

    userAnswers: string[] = [];
    correctCount: number = 0;
    totalTime: number = 0;
    finished: boolean = false;

    resetGame(): void {
        this._questions = [];
        this.userAnswers = [];
        this.correctCount = 0;
        this.totalTime = 0;
        this.finished = false;
    }
}
