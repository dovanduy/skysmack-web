import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesCashPaymentsActions, NgInvoicesCashPaymentsStore } from '@skysmack/ng-invoices-cash-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { InvoicesCashPaymentsAppState, CashPayment, INVOICES_CASH_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsMenu } from './../../ng-invoices-cash-payments-menu';
import { MenuItem } from '@skysmack/framework';
import { NgInvoicesCashPaymentsFieldsConfig } from '../../ng-invoices-cash-payments-fields-config';
import { RecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-invoices-cash-payments-index',
  templateUrl: './invoices-cash-payments-index.component.html'
})
export class InvoicesCashPaymentsIndexComponent extends RecordIndexComponent<InvoicesCashPaymentsAppState, CashPayment, number> implements OnInit {
  public static COMPONENT_KEY = 'invoices-cash-payments-index';
  public componentKey = InvoicesCashPaymentsIndexComponent.COMPONENT_KEY;

  public areaKey: string = INVOICES_CASH_PAYMENTS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
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
