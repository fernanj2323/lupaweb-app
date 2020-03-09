import { TestBed } from '@angular/core/testing';

import { ClosingPhaseService } from './closing-phase.service';

describe('ClosingPhaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClosingPhaseService = TestBed.get(ClosingPhaseService);
    expect(service).toBeTruthy();
  });
});
