import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgReceiptsActions, NgReceiptsStore } from '@skysmack/ng-packages';
import { ReceiptsAppState, Receipt, RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { NgReceiptsMenu } from '../../ng-receipts-menu';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgReceiptsFieldsConfig } from '../../ng-receipts-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-receipts-index',
  templateUrl: './receipts-index.component.html'
})
export class ReceiptsIndexComponent extends DocumentRecordIndexComponent<ReceiptsAppState, Receipt, number> implements OnInit {
  public areaKey: string = RECEIPTS_AREA_KEY;
  public titleExtras = true;
  public entityActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgReceiptsActions,
    public redux: NgSkysmackStore,
    public store: NgReceiptsStore,
    public sidebarMenu: NgReceiptsMenu,
    public fieldsConfig: NgReceiptsFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }


  ngOnInit() {
    super.ngOnInit();
  }
}
