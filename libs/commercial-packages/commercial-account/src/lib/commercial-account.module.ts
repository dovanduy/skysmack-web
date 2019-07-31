import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialAccountRoutingModule } from './commercial-account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from '@skysmack/portal-ui';
import { commercialAccountComponents } from './components/commercial-account-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CommercialAccountRoutingModule,
  ],
  declarations: [
    ...commercialAccountComponents,
  ],
  providers: [
    LanguageService
  ]
})
export class CommercialAccountModule {
  constructor() { }
}
