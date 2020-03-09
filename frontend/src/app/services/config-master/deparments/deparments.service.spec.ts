import { TestBed } from '@angular/core/testing';

import { DeparmentsService } from './deparments.service';

describe('DeparmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeparmentsService = TestBed.get(DeparmentsService);
    expect(service).toBeTruthy();
  });
});
