import { TestBed } from '@angular/core/testing';

import { DelgateService } from './delgate.service';

describe('DelgateService', () => {
  let service: DelgateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelgateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
