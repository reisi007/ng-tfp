import {Component, OnInit} from '@angular/core';
import {MeetingDateService} from './meeting-date.service';
import {LocalstorageService} from './localstorage.service';
import {HttpClient} from '@angular/common/http';
import {Converter} from 'showdown';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  title = 'Reisishot Fotoshooting Vertrag';
  email = 'florian@reisishot.pictures';
  customers: Array<object>;
  usernotes: string;
  contract: string;
  contractType: string;

  constructor(
    private  meetingDateService: MeetingDateService,
    private localstorageService: LocalstorageService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.customers = localstorageService.getCustomers();
    this.usernotes = localstorageService.getNote();
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.contractType = params.type;

      this.http.get('assets/' + this.contractType + '.markdown', {responseType: 'text'})
        .subscribe((markdown: string) => this.contract = new Converter().makeHtml(markdown), () =>
          this.contract = '<h2>Keine Daten zu diesem Vertrag gefunden!</h2>');
    });
  }

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
