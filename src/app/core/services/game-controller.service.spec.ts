import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameControllerService } from './game-controller.service';
import { SettingsService } from './settings.service';
import { Question } from '../../core/models/question.model';
import { skip, take } from 'rxjs/operators';

describe('GameControllerService', () => {
    let service: GameControllerService;
    let settings: SettingsService;
    let routerSpy: jasmine.SpyObj<Router>;

    const questions: Question[] = [
        {
            category: 'Cat',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Q1?',
            correct_answer: 'A',
            incorrect_answers: ['B', 'C', 'D'],
            all_answers: ['A', 'B', 'C', 'D']
        },
        {
            category: 'Cat',
            type: 'boolean',
            difficulty: 'easy',
            question: 'Q2?',
            correct_answer: 'True',
            incorrect_answers: ['False'],
            all_answers: ['True', 'False']
        }
    ];

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                GameControllerService,
                SettingsService,
                { provide: Router, useValue: routerSpy }
            ]
        });
        service = TestBed.inject(GameControllerService);
        settings = TestBed.inject(SettingsService);
    });

    it('should emit the first question on init (skipping null)', (done) => {
        service.question$
            .pipe(skip(1), take(1))
            .subscribe(q => {
                expect(q).toEqual(questions[0]);
                done();
            });
        service.init(questions);
    });

    it('should record answers and emit next questions', (done) => {
        const emitted: Question[] = [];

        service.question$
            .pipe(skip(1), take(2))
            .subscribe({
                next: q => emitted.push(q as Question),
                complete: () => {
                    expect(emitted).toEqual([questions[0], questions[1]]);
                    done();
                }
            });

        service.init(questions);
        service.answer('A');
    });

    it('should navigate to /results after last question', () => {
        service.init(questions);
        service.answer('A');
        service.answer('True');
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/results']);
        expect(settings.finished).toBeTrue();
    });

    it('should record blank answer on timerEnd', () => {
        service.init(questions);
        service.timerEnd();
        expect(settings.userAnswers.pop()).toBe('');
    });
});
