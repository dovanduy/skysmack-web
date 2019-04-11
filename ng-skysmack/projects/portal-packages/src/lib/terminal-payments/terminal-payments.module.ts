import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalPaymentsRoutingModule } from './terminal-payments-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgTerminalPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { terminalsComponents } from './terminals/components/terminals-components';
import { receiptsComponents } from './receipts/components/receipts-component';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TerminalPaymentsRoutingModule,
    NgTerminalPaymentsModule,
    PortalUiModule,
    FieldsModule
  ],
  exports: [],
  declarations: [
    ...terminalsComponents,
    ...receiptsComponents
  ],
  providers: [
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class TerminalPaymentsModule {
  constructor(public languageService: LanguageService) { }
}
