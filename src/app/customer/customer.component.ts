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

  @ViewChild('signatur') signaturCanvas: ElementRef;

  constructor() {
  }

  ngOnInit() {
    const nativeElement: HTMLCanvasElement = this.signaturCanvas.nativeElement;

    this.signaturePad = new SignaturePad(nativeElement);
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
