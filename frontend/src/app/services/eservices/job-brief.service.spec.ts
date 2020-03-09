import { TestBed } from '@angular/core/testing';

import { JobBriefService } from './job-brief.service';

describe('JobBriefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobBriefService = TestBed.get(JobBriefService);
    expect(service).toBeTruthy();
  });
});
