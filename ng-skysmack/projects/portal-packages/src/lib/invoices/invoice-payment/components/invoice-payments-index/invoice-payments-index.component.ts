import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicePaymentsActions, NgInvoicePaymentsFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgInvoicePaymentsStore } from '@skysmack/ng-packages';
import { InvoicePayment, InvoicePaymentsAppState } from '@skysmack/packages-invoices';
import { NgInvoicePaymentsMenu } from './../../ng-invoice-payments-menu';
import { EntityAction } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-invoice-payments-index',
  templateUrl: './invoice-payments-index.component.html',
  styleUrls: ['./invoice-payments-index.component.scss']
})
export class InvoicePaymentsIndexComponent extends DocumentRecordIndexComponent<InvoicePaymentsAppState, InvoicePayment, number> implements OnInit {

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
    public fieldsConfig: NgInvoicePaymentsFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
