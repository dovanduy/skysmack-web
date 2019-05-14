import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesCashPaymentsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesCashPaymentsStore } from '@skysmack/ng-packages';
import { InvoicesCashPaymentsAppState, CashPayment, INVOICES_CASH_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices-cash-payments';
import { NgInvoicesCashPaymentsMenu } from './../../ng-invoices-cash-payments-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgInvoicesCashPaymentsFieldsConfig } from '../../ng-invoices-cash-payments-fields-config';


@Component({
  selector: 'ss-invoices-cash-payments-index',
  templateUrl: './invoices-cash-payments-index.component.html'
})
export class InvoicesCashPaymentsIndexComponent extends RecordIndexComponent<InvoicesCashPaymentsAppState, CashPayment, number> implements OnInit {

  public areaKey: string = INVOICES_CASH_PAYMENTS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicesCashPaymentsActions,
    public redux: NgSkysmackStore,
    public store: NgInvoicesCashPaymentsStore,
    public sidebarMenu: NgInvoicesCashPaymentsMenu,
    public fieldsConfig: NgInvoicesCashPaymentsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
