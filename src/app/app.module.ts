import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {CustomerComponent} from './customer/customer.component';
import {FormsModule} from '@angular/forms';
import {AgePipe} from './customer/age.pipe';
import {SafePipe} from './contract/safe.pipe';
import {HttpClientModule} from '@angular/common/http';
import {ContractComponent} from './contract/contract.component';
import {DatePipe} from '@angular/common';
import {SignaturComponent} from './signatur/signatur.component';
import {HeaderComponent} from './header/header.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default',
  }, {
    path: ':contractType',
    component: ContractComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AgePipe,
    SafePipe,
    ContractComponent,
    SignaturComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
