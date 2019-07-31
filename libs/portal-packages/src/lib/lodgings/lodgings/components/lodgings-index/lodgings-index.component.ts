import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingsAppState, LODGINGS_AREA_KEY } from '@skysmack/packages-lodgings';
import { Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions, NgLodgingsStore } from '@skysmack/ng-lodgings';
import { NgLodgingsMenu } from '../../ng-lodgings-menu';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgLodgingsFieldsConfig } from '../../ng-lodgings-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-lodgings-index',
  templateUrl: './lodgings-index.component.html',
})
export class LodgingsIndexComponent extends DocumentRecordIndexComponent<LodgingsAppState, Lodging, number> implements OnInit {

  public areaKey: string = LODGINGS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingsActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingsStore,
    public sidebarMenu: NgLodgingsMenu,
    public fieldsConfig: NgLodgingsFieldsConfig,
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
