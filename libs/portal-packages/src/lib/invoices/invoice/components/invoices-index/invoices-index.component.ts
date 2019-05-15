import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, EntityActionProviders, ENTITY_ACTION_DETAILS, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
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
    new EntityAction().asUrlAction('items', 'INVOICES.ENTITY_ACTION.ITEMS', 'reorder'),
    new EntityAction().asUrlAction('details', ENTITY_ACTION_DETAILS, 'list'),
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgInvoicesStore,
    public sidebarMenu: NgInvoicesMenu,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
