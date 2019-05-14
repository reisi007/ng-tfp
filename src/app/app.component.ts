import {Component} from '@angular/core';
import {MeetingDateService} from './meeting-date.service';
import {LocalstorageService} from './localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private  meetingDateService: MeetingDateService, private localstorageService: LocalstorageService) {
    this.customers = localstorageService.getCustomers();
    this.usernotes = localstorageService.getNote();
  }

  title = 'Reisishot TFP Vertrag';
  email = 'florian@reisishot.pictures';
  customers: Array<object>;
  usernotes: string;


  addCustomer(): void {
    this.customers.push({});
    this.localstorageService.setCustomers(this.customers);

  }

  removeCustomer(): void {
    if (this.customers.length > 1) {
      this.customers.pop();
      this.localstorageService.setCustomers(this.customers);
    }
  }

  updateShootingDate($event): void {
    const shootingDate = ($event.currentTarget as HTMLInputElement).value;
    this.meetingDateService.meetingDate.next(shootingDate);
  }

  updateUsernote(value): void {
    this.localstorageService.setNote(value);
  }

  generatePdf(): void {
    window.print();
  }
}
