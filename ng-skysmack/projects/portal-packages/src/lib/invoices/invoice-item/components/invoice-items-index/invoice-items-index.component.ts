import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoiceItemsActions, NgInvoiceItemsFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgInvoiceItemsStore } from '@skysmack/ng-packages';
import { InvoiceItem, InvoiceItemsAppState } from '@skysmack/packages-invoices';
import { NgInvoiceItemsMenu } from './../../ng-invoice-items-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions, NgFieldReduxStore } from '@skysmack/ng-redux';


@Component({
  selector: 'ss-invoice-items-index',
  templateUrl: './invoice-items-index.component.html',
  styleUrls: ['./invoice-items-index.component.scss']
})
export class InvoiceItemsIndexComponent extends DocumentRecordIndexComponent<InvoiceItemsAppState, InvoiceItem, number> implements OnInit {

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoiceItemsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgInvoiceItemsStore,
    public sidebarMenu: NgInvoiceItemsMenu,
    public fieldsConfig: NgInvoiceItemsFieldsConfig,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldReduxStore
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
