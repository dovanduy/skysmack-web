import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesActions, NgInvoicesFieldsConfig } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { Invoice, InvoicesAppState } from '@skysmack/packages-invoices';
import { NgInvoicesMenu } from './../../ng-invoices-menu';
import { EntityAction } from '@skysmack/ng-ui';


@Component({
  selector: 'ss-invoices-index',
  templateUrl: './invoices-index.component.html',
  styleUrls: ['./invoices-index.component.scss']
})
export class InvoicesIndexComponent extends DocumentRecordIndexComponent<InvoicesAppState, Invoice, number> implements OnInit {

  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgInvoicesStore,
    public sidebarMenu: NgInvoicesMenu,
    public fieldsConfig: NgInvoicesFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
