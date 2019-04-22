import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Reisishot TFP Vertrag';
  customers = [{}];

  addCustomer(): void {
    this.customers.push({});
  }

  removeCustomer(): void {
    if (this.customers.length > 1) {
      this.customers.pop();
    }
  }


  generatePdf(): void {
    window.print();
  }
}
