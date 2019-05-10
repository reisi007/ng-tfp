import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CustomerComponent} from './customer/customer.component';
import {FormsModule} from '@angular/forms';
import {AgePipe} from './customer/age.pipe';
import {WebStorageModule} from 'ngx-store';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    WebStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
