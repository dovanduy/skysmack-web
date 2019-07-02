import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesCashPaymentsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesCashPaymentsStore } from '@skysmack/ng-packages';
import { InvoicesCashPaymentsAppState, CashPayment, INVOICES_CASH_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsMenu } from './../../ng-invoices-cash-payments-menu';
import { MenuItem } from '@skysmack/framework';
import { NgInvoicesCashPaymentsFieldsConfig } from '../../ng-invoices-cash-payments-fields-config';


@Component({
  selector: 'ss-invoices-cash-payments-index',
  templateUrl: './invoices-cash-payments-index.component.html'
})
export class InvoicesCashPaymentsIndexComponent extends RecordIndexComponent<InvoicesCashPaymentsAppState, CashPayment, number> implements OnInit {

  public areaKey: string = INVOICES_CASH_PAYMENTS_AREA_KEY;
  public entityActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicesCashPaymentsActions,
    public redux: NgSkysmackStore,
    public store: NgInvoicesCashPaymentsStore,
    public sidebarMenu: NgInvoicesCashPaymentsMenu,
    public fieldsConfig: NgInvoicesCashPaymentsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
