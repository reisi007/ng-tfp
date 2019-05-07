import {TestBed} from '@angular/core/testing';

import {MeetingDateService} from './meeting-date.service';

describe('MeetingDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingDateService = TestBed.get(MeetingDateService);
    expect(service).toBeTruthy();
  });
});
