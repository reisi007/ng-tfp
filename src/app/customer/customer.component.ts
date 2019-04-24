import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import {MeetingDateService} from "../meeting-date.service";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  birthday: string;
  now = new Date();
  nowString = this.now.toString();

  private signaturePad: SignaturePad;

  @ViewChild('signatur') signaturCanvasRef: ElementRef;

  @ViewChild('modelImg') modelImgRef: ElementRef;

  @ViewChild('modelImgUpload') modelImgUploadRef: ElementRef;

  modelImg: HTMLImageElement;
  modelImgUpload: HTMLInputElement;
  shootingDate: string;

  constructor(private  meetingDateService: MeetingDateService) {
    meetingDateService.meetingDate.asObservable().subscribe((value => {
      this.shootingDate = value;
    }));
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
        // @ts-ignore
        this.modelImg.src = e.target.result;
      };

      reader.readAsDataURL(this.modelImgUpload.files[0]);
    }
  }

  resetSignature() {
    this.signaturePad.clear();
  }
}
