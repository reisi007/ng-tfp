import {Component} from '@angular/core';
import {MeetingDateService} from './meeting-date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private  meetingDateService: MeetingDateService) {

  }

  title = 'Reisishot TFP Vertrag';
  email = 'florian@reisishot.pictures';
  customers = [{}];


  addCustomer(): void {
    this.customers.push({});
  }

  removeCustomer(): void {
    if (this.customers.length > 1) {
      this.customers.pop();
    }
  }

  updateShootingDate($event) {
    const shootingDate = ($event.currentTarget as HTMLInputElement).value;
    this.meetingDateService.meetingDate.next(shootingDate);
  }


  generatePdf(): void {
    window.print();
  }
}
