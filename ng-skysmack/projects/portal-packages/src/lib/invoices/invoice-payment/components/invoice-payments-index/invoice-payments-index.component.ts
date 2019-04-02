import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicePaymentsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgInvoicePaymentsStore } from '@skysmack/ng-packages';
import { InvoicePayment, InvoicePaymentsAppState } from '@skysmack/packages-invoices';
import { NgInvoicePaymentsMenu } from './../../ng-invoice-payments-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgInvoicePaymentsFieldsConfig } from '../../ng-invoice-payments-fields-config';

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
    public fieldsConfig: NgInvoicePaymentsFieldsConfig,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }


  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
