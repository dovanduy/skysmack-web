import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgInvoicesStore, NgInvoicesActions } from '@skysmack/ng-invoices';
import { Invoice, InvoicesAppState, INVOICES_AREA_KEY } from '@skysmack/packages-invoices';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgInvoicesFieldsConfig } from '../../ng-invoices-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-invoices-index',
  templateUrl: './invoices-index.component.html'
})
export class InvoicesIndexComponent extends DocumentRecordIndexComponent<InvoicesAppState, Invoice, number> implements OnInit {
  public static COMPONENT_KEY = 'invoices-index';
  public componentKey = InvoicesIndexComponent.COMPONENT_KEY;

  public areaKey: string = INVOICES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('items', 'INVOICES.ENTITY_ACTION.ITEMS', 'reorder'),
    new MenuItem().asUrlAction('details', MENU_ITEM_ACTION_DETAILS, 'list'),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgInvoicesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgInvoicesStore,
    public fieldsConfig: NgInvoicesFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
