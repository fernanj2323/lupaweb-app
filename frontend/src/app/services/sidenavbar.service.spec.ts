import { TestBed } from '@angular/core/testing';

import { SidenavbarService } from './sidenavbar.service';

describe('SidenavbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidenavbarService = TestBed.get(SidenavbarService);
    expect(service).toBeTruthy();
  });
});