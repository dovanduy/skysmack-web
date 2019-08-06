import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicePaymentsActions, NgInvoicePaymentsStore } from '@skysmack/ng-invoices';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { InvoicePayment, InvoicePaymentsAppState, INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';
import { NgInvoicePaymentsMenu } from './../../ng-invoice-payments-menu';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoicePaymentsFieldsConfig } from '../../ng-invoice-payments-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-invoice-payments-index',
  templateUrl: './invoice-payments-index.component.html'
})
export class InvoicePaymentsIndexComponent extends DocumentRecordIndexComponent<InvoicePaymentsAppState, InvoicePayment, number> implements OnInit {
  public static COMPONENT_KEY = 'invoice-payments-index';
  public componentKey = InvoicePaymentsIndexComponent.COMPONENT_KEY;

  public areaKey: string = INVOICE_PAYMENTS_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicePaymentsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgInvoicePaymentsStore,
    public sidebarMenu: NgInvoicePaymentsMenu,
    public fieldsConfig: NgInvoicePaymentsFieldsConfig,
    public fieldActions: NgFieldActions,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
