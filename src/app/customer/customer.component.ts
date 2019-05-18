import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import {MeetingDateService} from '../contract/meeting-date.service';
import {LocalstorageService} from '../localstorage.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Input() public customerId: number;

  constructor(
    private  meetingDateService: MeetingDateService,
    private localstorageService: LocalstorageService,
    private datePipe: DatePipe
  ) {
    meetingDateService.meetingDate.asObservable().subscribe((value => {
      this.shootingDate = value;
    }));
  }

  private readonly KEY_BIRTHDAY = 'birthday';
  birthday: string;
  private readonly KEY_FIRSTNAME = 'firstname';
  firstname: string;
  private readonly KEY_LASTNAME = 'lastname';
  lastname: string;
  private readonly KEY_EMAIL = 'email';
  email: string;
  now = new Date();
  nowString = this.now.toString();
  private readonly KEY_PICTURE = 'picture';


  private signaturePad: SignaturePad;

  @ViewChild('signatur') signaturCanvasRef: ElementRef;
  @ViewChild('signaturDiv') signaturCanvasDivRef: ElementRef;

  @ViewChild('modelImg') modelImgRef: ElementRef;

  @ViewChild('modelImgUpload') modelImgUploadRef: ElementRef;

  modelImg: HTMLImageElement;
  modelImgUpload: HTMLInputElement;
  shootingDate: string;

  ngOnInit(): void {
    // Setup signatur
    this.onSignaturResize();

    this.modelImg = this.modelImgRef.nativeElement;
    this.modelImgUpload = this.modelImgUploadRef.nativeElement;

    // Fill fields
    this.birthday = this.localstorageService.getModelData(this.KEY_BIRTHDAY, this.customerId);
    this.firstname = this.localstorageService.getModelData(this.KEY_FIRSTNAME, this.customerId);
    this.lastname = this.localstorageService.getModelData(this.KEY_LASTNAME, this.customerId);
    this.email = this.localstorageService.getModelData(this.KEY_EMAIL, this.customerId);
    const imgData = this.localstorageService.getModelData(this.KEY_PICTURE, this.customerId);
    if (imgData) {
      this.modelImg.src = imgData;
    }
  }

  onUploadedImageChanged(): void {
    if (this.modelImgUpload.files && this.modelImgUpload.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        // @ts-ignore
        const imgData = e.target.result;
        this.modelImg.src = imgData;
        this.localstorageService.setModelData(this.KEY_PICTURE, this.customerId, imgData);
      };

      reader.readAsDataURL(this.modelImgUpload.files[0]);
    }
  }

  resetSignature(): void {
    this.signaturePad.clear();
  }

  firstnameChanged(value): void {
    this.localstorageService.setModelData(this.KEY_FIRSTNAME, this.customerId, value);
  }

  lastnameChanged(value): void {
    this.localstorageService.setModelData(this.KEY_LASTNAME, this.customerId, value);
  }

  emailChanged(value): void {
    this.localstorageService.setModelData(this.KEY_EMAIL, this.customerId, value);
  }

  birthdayChanged(value): void {
    this.localstorageService.setModelData(this.KEY_BIRTHDAY, this.customerId, value);
  }

  onSignaturResize(): void {
    // Setup canvas
    const signaturCanvas: HTMLCanvasElement = this.signaturCanvasRef.nativeElement;
    const signaturDiv: HTMLDivElement = this.signaturCanvasDivRef.nativeElement;
    const signaturWidth = signaturDiv.offsetWidth;
    const signaturHeight = signaturDiv.offsetHeight;

    signaturCanvas.width = signaturWidth;
    signaturCanvas.height = signaturHeight;

    let data = null;
    if (this.signaturePad) {
      data = this.signaturePad.toData();
    }

    this.signaturePad = new SignaturePad(signaturCanvas);

    if (data !== null) {
      this.signaturePad.fromData(data);
    }

    // Add background text
    const canvasContext = signaturCanvas.getContext('2d');
    const textHeightPx = 10;
    canvasContext.font = textHeightPx + 'px Arial';
    canvasContext.globalCompositeOperation = 'destination-over';
    canvasContext.strokeStyle = '#b2b2b2';
    canvasContext.fillStyle = '#d3d3d3';

    const canvasText = 'Reisishot Contract ' + this.datePipe.transform(this.now, 'dd.MM.yyyy \'um\' HH:mm:ss');
    const canvasTextMetrics = canvasContext.measureText(canvasText);
    for (let y = 0; y - textHeightPx < signaturCanvas.height; y += 4 + textHeightPx) {
      for (let x = -20 * y; x - canvasTextMetrics.width < signaturCanvas.width; x += 12 + canvasTextMetrics.width) {
        canvasContext.strokeText(canvasText, x, y);
      }
    }
    canvasContext.fillStyle = 'black';
    canvasContext.globalCompositeOperation = 'source-over';
  }
}
