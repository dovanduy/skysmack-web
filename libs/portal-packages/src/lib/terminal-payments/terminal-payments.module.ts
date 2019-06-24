import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalPaymentsRoutingModule } from './terminal-payments-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgTerminalPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule, EntityActionProviders } from '@skysmack/portal-ui';
import { terminalsComponents } from './terminals/components/terminals-components';
import { receiptsComponents } from './receipts/components/receipts-component';
import { LanguageService } from '@skysmack/portal-ui';
import { clientsComponents } from './clients/components/clients-component';
import { connectionsComponents } from './connections';
import { terminalPaymentsIndexComponents } from './components/teminal-payments-index-components';
import { NgInvoicesTerminalPaymentsEntityActionProvider } from './ng-invoices-terminal-payments-entity-action-provider';
import { InvoicesType } from '@skysmack/packages-invoices';

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
    ...terminalPaymentsIndexComponents,
    ...terminalsComponents,
    ...receiptsComponents,
    ...clientsComponents,
    ...connectionsComponents
  ],
  providers: [
    LanguageService
  ]
})
export class TerminalPaymentsModule {
  constructor(
    entityActionProviders: EntityActionProviders,
    invoicesCashPaymentsEntityProvider: NgInvoicesTerminalPaymentsEntityActionProvider,
  ) {
    entityActionProviders.add(InvoicesType.id, invoicesCashPaymentsEntityProvider);
  }
}
