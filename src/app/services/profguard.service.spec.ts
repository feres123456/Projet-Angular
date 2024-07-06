import { TestBed } from '@angular/core/testing';

import { ProfguardService } from './profguard.service';

describe('ProfguardService', () => {
  let service: ProfguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
