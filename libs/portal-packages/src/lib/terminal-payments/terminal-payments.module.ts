import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalPaymentsRoutingModule } from './terminal-payments-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgTerminalPaymentsModule } from '@skysmack/ng-terminal-payments';
import { PortalUiModule, MenuItemActionProviders, NgMenuProviders } from '@skysmack/portal-ui';
import { terminalsComponents } from './terminals/components/terminals-components';
import { receiptsComponents } from './receipts/components/receipts-component';
import { terminalPaymentsIndexComponents } from './components/teminal-payments-index-components';
import { NgInvoicesTerminalPaymentsMenuItemActionProvider } from './ng-invoices-terminal-payments-menu-item-action-provider';
import { InvoicesTypeId } from '@skysmack/package-types';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { TerminalsPayComponent } from './terminals/components/terminals-pay/terminals-pay.component';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgTerminalPaymentsIndexMenuProvider } from './ng-terminal-payments-index-menu-provider';
import { NgReceiptsMenuProvider } from './receipts/ng-receipts-menu-provider';
import { NgTerminalsMenuProvider } from './terminals/ng-terminals-menu-provider';
import { NgConnectionsMenuProvider } from './connections/ng-connections-menu-provider';
import { connectionsComponents } from './connections/components/connections-component';
import { terminalPaymentReceiptsComponents } from './terminal-payment-receipts/components/terminal-payment-receipts-components';
import { terminalReceiptsComponents } from './terminal-receipts/components/terminal-receipts-components';
import { NgTerminalPaymentReceiptsMenuProvider } from './terminal-receipts/ng-terminal-receipts-menu-provider';
import { NgTerminalReceiptsMenuProvider } from './terminal-payment-receipts/ng-terminal-payment-receipts-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TerminalPaymentsRoutingModule,
    NgTerminalPaymentsModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...terminalPaymentsIndexComponents,
    ...terminalsComponents,
    ...receiptsComponents,
    ...connectionsComponents,
    ...terminalPaymentReceiptsComponents,
    ...terminalReceiptsComponents
  ],
  entryComponents: [
    TerminalsPayComponent
  ],
  providers: []
})
export class TerminalPaymentsModule {
  constructor(
    menuItemActionProviders: MenuItemActionProviders,
    invoicesCashPaymentsMenuItemActionProvider: NgInvoicesTerminalPaymentsMenuItemActionProvider,
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngTerminalPaymentsIndexMenuProvider: NgTerminalPaymentsIndexMenuProvider,
    ngReceiptsMenuProvider: NgReceiptsMenuProvider,
    ngTerminalsMenuProvider: NgTerminalsMenuProvider,
    ngConnectionsMenuProvider: NgConnectionsMenuProvider,
    ngTerminalPaymentReceiptsMenuProvider: NgTerminalPaymentReceiptsMenuProvider,
    ngTerminalReceiptsMenuProvider: NgTerminalReceiptsMenuProvider
  ) {
    menuItemActionProviders.add(InvoicesTypeId, invoicesCashPaymentsMenuItemActionProvider);

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);

    ngMenuProviders
      .add(ngTerminalPaymentsIndexMenuProvider)
      .add(ngReceiptsMenuProvider)
      .add(ngTerminalsMenuProvider)
      .add(ngTerminalPaymentReceiptsMenuProvider)
      .add(ngTerminalReceiptsMenuProvider)
      .add(ngConnectionsMenuProvider);
  }
}
