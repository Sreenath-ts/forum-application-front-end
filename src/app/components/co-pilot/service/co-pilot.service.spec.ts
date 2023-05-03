import { TestBed } from '@angular/core/testing';

import { CoPilotService } from './co-pilot.service';

describe('CoPilotService', () => {
  let service: CoPilotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoPilotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
