import 'zone.js/testing';
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
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TimerComponent);
            component = fixture.componentInstance;
        });
    }));

    it('should emit initial tick equal to duration on init', fakeAsync(() => {
        const ticks: number[] = [];
        component.duration = 5;
        component.tick.subscribe(v => ticks.push(v));

        fixture.detectChanges();
        tick();
        expect(ticks).toEqual([5]);
    }));

    it('should emit tick every second and decrement until zero then stop', fakeAsync(() => {
        const ticks: number[] = [];
        const finishedSpy = jasmine.createSpy('finished');
        component.duration = 3;
        component.tick.subscribe(v => ticks.push(v));
        component.finished.subscribe(finishedSpy);

        fixture.detectChanges();

        tick(0);
        expect(ticks).toEqual([3]);

        tick(1000);
        expect(ticks).toEqual([3, 2]);

        tick(1000);
        expect(ticks).toEqual([3, 2, 1]);

        tick(1000);
        expect(ticks).toEqual([3, 2, 1, 0]);
        expect(finishedSpy).toHaveBeenCalled();

        tick(2000);
        expect(ticks).toEqual([3, 2, 1, 0]);
    }));

    it('should clear interval on destroy', fakeAsync(() => {
        spyOn(window, 'clearInterval').and.callThrough();

        component.duration = 2;
        fixture.detectChanges();
        tick(0);

        const id = (component as any).timerId;
        component.ngOnDestroy();

        expect(clearInterval).toHaveBeenCalledWith(id);
    }));
});
