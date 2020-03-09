import { TestBed } from '@angular/core/testing';

import { JpactivityService } from './jpactivity.service';

describe('JpactivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JpactivityService = TestBed.get(JpactivityService);
    expect(service).toBeTruthy();
  });
});
