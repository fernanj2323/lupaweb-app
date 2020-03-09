import { TestBed } from '@angular/core/testing';

import { HomeCardService } from './home-card.service';

describe('HomeCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeCardService = TestBed.get(HomeCardService);
    expect(service).toBeTruthy();
  });
});
