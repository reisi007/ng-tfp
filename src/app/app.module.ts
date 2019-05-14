import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CustomerComponent} from './customer/customer.component';
import {FormsModule} from '@angular/forms';
import {AgePipe} from './customer/age.pipe';
import {SafePipe} from './safe.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AgePipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
