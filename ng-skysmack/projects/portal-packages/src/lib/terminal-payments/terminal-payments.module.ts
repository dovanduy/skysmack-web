import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalPaymentsRoutingModule } from './terminal-payments-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgTerminalPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, DynamicFieldsModule } from '@skysmack/portal-ui';
import { terminalsComponents } from './components/terminals-components';
import { receiptsComponents } from './components/receipts-component';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TerminalPaymentsRoutingModule,
    NgTerminalPaymentsModule,
    PortalUiModule,
    DynamicFieldsModule
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
