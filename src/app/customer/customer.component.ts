import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import {MeetingDateService} from '../meeting-date.service';
import {LocalstorageService} from '../localstorage.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  @Input() public customerId: number;

  constructor(private  meetingDateService: MeetingDateService, private localstorageService: LocalstorageService) {
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

  @ViewChild('modelImg') modelImgRef: ElementRef;

  @ViewChild('modelImgUpload') modelImgUploadRef: ElementRef;

  modelImg: HTMLImageElement;
  modelImgUpload: HTMLInputElement;
  shootingDate: string;

  ngOnInit(): void {
    const nativeElement: HTMLCanvasElement = this.signaturCanvasRef.nativeElement;
    this.signaturePad = new SignaturePad(nativeElement);

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
}
