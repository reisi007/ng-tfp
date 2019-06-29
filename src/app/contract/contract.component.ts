import {Component, OnInit} from '@angular/core';
import {MeetingDateService} from './meeting-date.service';
import {LocalstorageService} from '../localstorage.service';
import {HttpClient} from '@angular/common/http';
import {Converter} from 'showdown';
import {ActivatedRoute} from '@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

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

      this.http.get('assets/contracts/' + this.contractType + '.markdown', {responseType: 'text'})
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
    document.body.style.width = document.body.offsetWidth + 'px';
    let ignoredHeight = 0;
    // @ts-ignore
    const a: Promise<HTMLCanvasElement> = html2canvas(document.body, {
      ignoreElements: (element: HTMLElement) => {
        const shouldIgnore = element.classList.contains('no-print');
        if (shouldIgnore) {
          ignoredHeight += element.offsetHeight;
        }
        return shouldIgnore;
      }
    });
    a.then(canvas => {
      const factor = 0.75 * window.devicePixelRatio; // Magic constant
      const img = canvas.toDataURL('image/jpeg', 0.9);
      const imgElement = new Image();
      const offset = 10;
      imgElement.onload = () => {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          letterRendering: true,
          format: [imgElement.width + 2 * offset, imgElement.height + 2 * offset - factor * ignoredHeight]
        });
        doc.addImage(img, 'JPEG', offset, offset - ignoredHeight * factor, imgElement.width * factor, imgElement.height * factor);
        doc.save('Reisishot_Fotoshooting Vertrag.pdf');
        document.body.style.width = '';
      };
      imgElement.src = img;
    });
  }
}
