import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResults } from './game-results';

describe('GameResults', () => {
  let component: GameResults;
  let fixture: ComponentFixture<GameResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
