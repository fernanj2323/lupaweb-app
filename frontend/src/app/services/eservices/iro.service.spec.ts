import { TestBed } from '@angular/core/testing';

import { IroService } from './iro.service';

describe('IroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IroService = TestBed.get(IroService);
    expect(service).toBeTruthy();
  });
});
