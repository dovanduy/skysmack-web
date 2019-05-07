import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgInvoicesActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgInvoicesStore } from '@skysmack/ng-packages';
import { Invoice, InvoicesAppState, INVOICES_AREA_KEY } from '@skysmack/packages-invoices';
import { NgInvoicesMenu } from './../../ng-invoices-menu';
import { EntityAction } from '@skysmack/ng-ui';
import { NgFieldActions } from '@skysmack/ng-redux';
import { NgInvoicesFieldsConfig } from '../../ng-invoices-fields-config';


@Component({
  selector: 'ss-invoices-index',
  templateUrl: './invoices-index.component.html'
})
export class InvoicesIndexComponent extends DocumentRecordIndexComponent<InvoicesAppState, Invoice, number> implements OnInit {

  public areaKey: string = INVOICES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('items', 'Items', 'reorder'),
    new EntityAction().asUrlAction('details', 'Details', 'list'),
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicesActions,
    public redux: NgSkysmackStore,
    public store: NgInvoicesStore,
    public sidebarMenu: NgInvoicesMenu,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
