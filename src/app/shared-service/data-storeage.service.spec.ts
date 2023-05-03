import { TestBed } from '@angular/core/testing';

import { DataStoreageService } from './data-storeage.service';

describe('DataStoreageService', () => {
  let service: DataStoreageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStoreageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
