import { TestBed } from '@angular/core/testing';

import { RolConfigService } from './rol-config.service';

describe('RolConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RolConfigService = TestBed.get(RolConfigService);
    expect(service).toBeTruthy();
  });
});
