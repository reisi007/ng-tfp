import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingDateService {

  meetingDate: Subject<string>;

  constructor() {
    this.meetingDate = new Subject<any>();
  }
}
