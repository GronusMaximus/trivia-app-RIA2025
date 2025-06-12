import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    categoryId: number | null = null;
    difficulty: string = 'easy';
    type: 'multiple' | 'boolean' = 'multiple';
    amount: number = 10;

    // Game state
    questions: Question[] = [];
    userAnswers: string[] = [];
    correctCount: number = 0;
    totalTime: number = 0;
    finished: boolean = false;

    resetGame() {
        this.questions = [];
        this.userAnswers = [];
        this.correctCount = 0;
        this.totalTime = 0;
        this.finished = false;
    }
}
