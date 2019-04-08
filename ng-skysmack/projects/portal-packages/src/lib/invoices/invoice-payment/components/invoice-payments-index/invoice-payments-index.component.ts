import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicePaymentsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgInvoicePaymentsStore } from '@skysmack/ng-packages';
import { InvoicePayment, InvoicePaymentsAppState, INVOICE_PAYMENTS_AREA_KEY } from '@skysmack/packages-invoices';
import { NgInvoicePaymentsMenu } from './../../ng-invoice-payments-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgInvoicePaymentsFieldsConfig } from '../../ng-invoice-payments-fields-config';

@Component({
  selector: 'ss-invoice-payments-index',
  templateUrl: './invoice-payments-index.component.html'
})
export class InvoicePaymentsIndexComponent extends DocumentRecordIndexComponent<InvoicePaymentsAppState, InvoicePayment, number> implements OnInit {

  public area: string = INVOICE_PAYMENTS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
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
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
