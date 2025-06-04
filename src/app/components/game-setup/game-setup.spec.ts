import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSetup } from './game-setup';

describe('GameSetup', () => {
  let component: GameSetup;
  let fixture: ComponentFixture<GameSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
