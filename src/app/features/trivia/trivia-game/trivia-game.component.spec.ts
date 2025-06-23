import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { TriviaGameComponent } from './trivia-game.component';
import { TriviaService } from '../../../core/services/trivia.service';
import { SettingsService } from '../../../core/services/settings.service';
import { GameControllerService } from '../../../core/services/game-controller.service';
import { of, throwError } from 'rxjs';
import { Question } from '../../../core/models/question.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimerComponent } from '../../../shared/components/ui/timer/timer.component';
import { QuestionMultipleComponent } from '../../../shared/components/ui/question-multiple/question-multiple.component';
import { QuestionBooleanComponent } from '../../../shared/components/ui/question-boolean/question-boolean.component';
import { By } from '@angular/platform-browser';

describe('TriviaGameComponent', () => {
    let component: TriviaGameComponent;
    let fixture: ComponentFixture<TriviaGameComponent>;
    let triviaService: jasmine.SpyObj<TriviaService>;
    let settings: SettingsService;
    let gameController: GameControllerService;

    const dummyQuestions: Question[] = [
        {
            category: 'Cat',
            type: 'multiple',
            difficulty: 'easy',
            question: 'Q1?',
            correct_answer: 'A',
            incorrect_answers: ['B', 'C', 'D'],
            all_answers: ['A', 'B', 'C', 'D']
        }
    ];

    beforeEach(waitForAsync(() => {
        const triviaSpy = jasmine.createSpyObj('TriviaService', ['getToken', 'getQuestions']);

        TestBed.configureTestingModule({
            imports: [
                TriviaGameComponent,
                CommonModule,
                MatProgressSpinnerModule,
                TimerComponent,
                QuestionMultipleComponent,
                QuestionBooleanComponent
            ],
            providers: [
                { provide: TriviaService, useValue: triviaSpy },
                SettingsService,
                GameControllerService
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TriviaGameComponent);
            component = fixture.componentInstance;
            triviaService = TestBed.inject(TriviaService) as jasmine.SpyObj<TriviaService>;
            settings = TestBed.inject(SettingsService);
            gameController = TestBed.inject(GameControllerService);
        });
    }));

    it('shows spinner while loading and then displays question', fakeAsync(() => {
        triviaService.getToken.and.returnValue(of('tok'));
        triviaService.getQuestions.and.returnValue(of(dummyQuestions));

        // initial render
        fixture.detectChanges();
        expect(component.loading).toBeTrue();
        expect(fixture.debugElement.query(By.css('mat-spinner'))).toBeTruthy();

        // advance through setTimeout(…,0) and observables
        tick();
        fixture.detectChanges();

        // final state
        expect(component.loading).toBeFalse();
        expect(component.question).toEqual(dummyQuestions[0]);
        expect(fixture.debugElement.query(By.css('.game-header'))).toBeTruthy();
    }));

    it('displays error and retry button on token error', fakeAsync(() => {
        triviaService.getToken.and.returnValue(throwError(() => new Error('Tok fail')));

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(component.loading).toBeFalse();
        expect(component.errorMessage).toBe('Tok fail');
        const btn = fixture.debugElement.query(By.css('.error-message button'));
        expect(btn).toBeTruthy();
    }));

    it('retry() calls loadQuestions again after error', fakeAsync(() => {
        triviaService.getToken.and.returnValues(
            throwError(() => new Error('Failed')),
            of('tok2')
        );
        triviaService.getQuestions.and.returnValue(of(dummyQuestions));

        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(component.errorMessage).toBe('Failed');

        const btn = fixture.debugElement.query(By.css('.error-message button'));
        btn.triggerEventHandler('click', null);
        fixture.detectChanges();

        tick();
        fixture.detectChanges();

        expect(component.errorMessage).toBeNull();
        expect(component.question).toEqual(dummyQuestions[0]);
    }));

    it('forwards ticks and finished events to gameController', () => {
        spyOn(gameController, 'answer');
        spyOn(gameController, 'timerEnd');

        component.onAnswer('A');
        expect(gameController.answer).toHaveBeenCalledWith('A');

        component.onTimerEnd();
        expect(gameController.timerEnd).toHaveBeenCalled();
    });
});
