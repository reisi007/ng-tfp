import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MeetingDateService} from './meeting-date.service';
import {LocalstorageService} from '../localstorage.service';
import {HttpClient} from '@angular/common/http';
import {Converter} from 'showdown';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import SignaturePad from 'signature_pad';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  constructor(
    private meetingDateService: MeetingDateService,
    private localstorageService: LocalstorageService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.customers = localstorageService.getCustomers();
    this.usernotes = localstorageService.getNote();
    this.datePipe = datePipe;
  }

  private readonly customers: Array<object>;
  private usernotes: string;
  private contract = '';
  private endblabla = '';
  private contractType: string;
  private readonly converter = new Converter();
  public isDigitaleSignatur = true;
  private now = new Date();
  @ViewChild('signatur') signaturCanvasRef: ElementRef;
  @ViewChild('signaturDiv') signaturCanvasDivRef: ElementRef;

  private signaturePad: SignaturePad;
  signaturCanvas: HTMLCanvasElement;

  loadMarkdown(relativeUrl: string): Observable<string> {
    return this.http.get(relativeUrl, {responseType: 'text'})
      .pipe(map((markdown: string) => this.converter.makeHtml(markdown)))
      .pipe(catchError((err, caught) => {
        console.log('Cannot download ', err);
        return caught;
      }));
  }

  loadContract(contractName: string): Observable<string> {
    return this.loadMarkdown('assets/contracts/' + contractName + '.markdown');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.contractType = params.contractType;

        this.loadContract(this.contractType).subscribe(
          (markdown: string) => this.contract = markdown,
          () => this.contract = '<h2>Keine Daten zu diesem Vertrag gefunden!</h2>');
      }
    );

    this.loadMarkdown('assets/endblabla.markdown')
      .subscribe((markdown: string) => this.endblabla = markdown);
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

  printPage(): void {
    window.print();
  }

  resetCache(): void {
    this.localstorageService.clear();
    window.location.reload();
  }
}
