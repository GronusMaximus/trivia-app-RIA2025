import 'zone.js/testing';           // <-- Esto debe estar primero
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { TimerComponent } from './timer.component';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TimerComponent', () => {
    let fixture: ComponentFixture<TimerComponent>;
    let component: TimerComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TimerComponent,
                MatIconModule,
                NoopAnimationsModule
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(TimerComponent);
                component = fixture.componentInstance;
            });
    }));

    it('should emit initial tick equal to duration on init', fakeAsync(() => {
        const ticks: number[] = [];
        component.duration = 5;
        component.tick.subscribe(value => ticks.push(value));

        fixture.detectChanges(); // triggers ngOnInit
        tick(); // advance fake timer by 0ms to flush init

        expect(ticks).toEqual([5]);
    }));

    it('should emit tick every second and decrement until zero', fakeAsync(() => {
        const ticks: number[] = [];
        component.duration = 3;
        component.tick.subscribe(value => ticks.push(value));
        component.finished.subscribe(() => ticks.push(-1)); // mark finish

        fixture.detectChanges(); // ngOnInit
        // initial
        tick(0);
        expect(ticks).toEqual([3]);

        // after 1s
        tick(1000);
        expect(ticks).toEqual([3, 2]);

        // after 2s
        tick(1000);
        expect(ticks).toEqual([3, 2, 1]);

        // after 3s: reaches zero, emits 0, then finished
        tick(1000);
        expect(ticks).toEqual([3, 2, 1, 0, -1]);

        // further ticks should not emit anything
        tick(2000);
        expect(ticks).toEqual([3, 2, 1, 0, -1]);
    }));

    it('should clear interval on destroy', fakeAsync(() => {
        spyOn(window, 'clearInterval').and.callThrough();
        component.duration = 2;
        fixture.detectChanges(); // ngOnInit
        tick(0);

        component.ngOnDestroy();
        expect(clearInterval).toHaveBeenCalledWith(component['timerId']);
    }));
});
