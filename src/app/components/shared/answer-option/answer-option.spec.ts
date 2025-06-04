import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOption } from './answer-option';

describe('AnswerOption', () => {
  let component: AnswerOption;
  let fixture: ComponentFixture<AnswerOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
