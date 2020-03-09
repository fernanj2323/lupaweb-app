import { TestBed } from '@angular/core/testing';

import { LectionsService } from './lections.service';

describe('LectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LectionsService = TestBed.get(LectionsService);
    expect(service).toBeTruthy();
  });
});
