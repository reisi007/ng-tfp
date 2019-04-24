import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  birthday: string;

  age = '';

  private signaturePad: SignaturePad;

  @ViewChild('signatur') signaturCanvasRef: ElementRef;

  @ViewChild('modelImg') modelImgRef: ElementRef;

  @ViewChild('modelImgUpload') modelImgUploadRef: ElementRef;

  modelImg: HTMLImageElement;
  modelImgUpload: HTMLInputElement;

  constructor() {
  }

  ngOnInit() {
    const nativeElement: HTMLCanvasElement = this.signaturCanvasRef.nativeElement;
    this.signaturePad = new SignaturePad(nativeElement);

    this.modelImg = this.modelImgRef.nativeElement;
    this.modelImgUpload = this.modelImgUploadRef.nativeElement;
  }

  onUploadedImageChanged() {
    if (this.modelImgUpload.files && this.modelImgUpload.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        this.modelImg.src = e.target.result;
      };

      reader.readAsDataURL(this.modelImgUpload.files[0]);
    }
  }

  resetSignature() {
    this.signaturePad.clear();
  }

  onBirthdayChanegd(): void {
    const cur = new Date();
    cur.setHours(23, 59, 0, 0);
    const enteredDate = new Date(this.birthday);
    enteredDate.setHours(0, 0, 0, 0);
    let ms = cur.getTime() - enteredDate.getTime();
    ms = ms / 1000 / 60 / 60 / 24 / 365.249;
    const detail = 100;
    const calculatedAge = Math.floor(ms * detail) / detail;
    this.age = 'Alter: ' + calculatedAge + ' Jahre';
    if (calculatedAge < 18) {
      this.age += ' -- Minderjährig';
    }
  }
}
