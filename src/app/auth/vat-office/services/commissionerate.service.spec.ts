import { TestBed } from '@angular/core/testing';

import { CommissionerateService } from './commissionerate.service';

describe('CommissionerateService', () => {
  let service: CommissionerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
