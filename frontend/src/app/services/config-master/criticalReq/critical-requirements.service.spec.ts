import { TestBed } from '@angular/core/testing';

import { CriticalRequirementsService } from './critical-requirements.service';

describe('CriticalRequirementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CriticalRequirementsService = TestBed.get(CriticalRequirementsService);
    expect(service).toBeTruthy();
  });
});
