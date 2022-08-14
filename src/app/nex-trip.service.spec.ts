import { TestBed } from '@angular/core/testing';

import { NexTripService } from './nex-trip.service';

describe('NexTripService', () => {
  let service: NexTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NexTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
