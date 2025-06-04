import { TestBed } from '@angular/core/testing';

import { Trivia } from './trivia';

describe('Trivia', () => {
  let service: Trivia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trivia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
