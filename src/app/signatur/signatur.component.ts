import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-signatur',
  templateUrl: './signatur.component.html',
  styleUrls: ['./signatur.component.scss']
})
export class SignaturComponent implements OnInit {
  now = new Date();

  private signaturePad: SignaturePad;

  @ViewChild('signatur', {static: true}) private signaturCanvasRef: ElementRef;

  @ViewChild('signaturDiv', {static: true}) private signaturCanvasDivRef: ElementRef;
  private signaturCanvas: HTMLCanvasElement;


  constructor(private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.signaturCanvas = this.signaturCanvasRef.nativeElement;
    // Setup signatur
    this.onSignaturResize();
  }

  resetSignature(): void {
    this.signaturePad.clear();
    this.drawCanvasBackground();
  }

  onSignaturResize(): void {
    // Setup canvas
    const signaturDiv: HTMLDivElement = this.signaturCanvasDivRef.nativeElement;
    const signaturWidth = signaturDiv.offsetWidth;
    const signaturHeight = signaturDiv.offsetHeight;

    this.signaturCanvas.width = signaturWidth;
    this.signaturCanvas.height = signaturHeight;

    let data = null;
    if (this.signaturePad) {
      data = this.signaturePad.toData();
      this.signaturePad.off();
    }

    this.signaturePad = new SignaturePad(this.signaturCanvas);

    if (data !== null) {
      this.signaturePad.fromData(data);
    }

    this.drawCanvasBackground();
  }

  drawCanvasBackground(): void {
    // Add background text
    const canvasContext = this.signaturCanvas.getContext('2d');
    const textHeightPx = 10;
    canvasContext.font = textHeightPx + 'px Arial';
    canvasContext.globalCompositeOperation = 'destination-over';
    canvasContext.strokeStyle = '#b2b2b2';
    canvasContext.fillStyle = '#d3d3d3';

    const canvasText = 'Reisishot Contract ' + this.datePipe.transform(this.now, 'dd.MM.yyyy \'um\' HH:mm:ss');
    const canvasTextMetrics = canvasContext.measureText(canvasText);
    for (let y = 0; y - textHeightPx < this.signaturCanvas.height; y += 4 + textHeightPx) {
      for (let x = -20 * y; x - canvasTextMetrics.width < this.signaturCanvas.width; x += 12 + canvasTextMetrics.width) {
        canvasContext.strokeText(canvasText, x, y);
      }
    }
    canvasContext.fillStyle = 'black';
    canvasContext.globalCompositeOperation = 'source-over';
  }
}
