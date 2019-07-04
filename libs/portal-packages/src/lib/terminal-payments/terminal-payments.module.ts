import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalPaymentsRoutingModule } from './terminal-payments-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgTerminalPaymentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule, MenuItemActionProviders } from '@skysmack/portal-ui';
import { terminalsComponents } from './terminals/components/terminals-components';
import { receiptsComponents } from './receipts/components/receipts-component';
import { LanguageService } from '@skysmack/portal-ui';
import { clientsComponents } from './clients/components/clients-component';
import { connectionsComponents } from './connections';
import { terminalPaymentsIndexComponents } from './components/teminal-payments-index-components';
import { NgInvoicesTerminalPaymentsMenuItemActionProvider } from './ng-invoices-terminal-payments-menu-item-action-provider';
import { InvoicesType } from '@skysmack/packages-invoices';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { TerminalsPayComponent } from './terminals/components/terminals-pay/terminals-pay.component';

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
  entryComponents: [
    TerminalsPayComponent
  ],
  providers: [
    LanguageService
  ]
})
export class TerminalPaymentsModule {
  constructor(
    menuItemActionProviders: MenuItemActionProviders,
    invoicesCashPaymentsMenuItemActionProvider: NgInvoicesTerminalPaymentsMenuItemActionProvider,
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    menuItemActionProviders.add(InvoicesType.id, invoicesCashPaymentsMenuItemActionProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
