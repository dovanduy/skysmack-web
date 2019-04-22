import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalPaymentsRoutingModule } from './terminal-payments-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgTerminalPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { terminalsComponents } from './terminals/components/terminals-components';
import { receiptsComponents } from './receipts/components/receipts-component';
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
    LanguageService
  ]
})
export class TerminalPaymentsModule {
  constructor() { }
}
