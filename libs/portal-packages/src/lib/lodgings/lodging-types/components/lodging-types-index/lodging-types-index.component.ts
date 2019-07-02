import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, DocumentRecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { LodgingTypesAppState, LodgingType, LODGING_TYPES_AREA_KEY } from '@skysmack/packages-lodgings';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { MenuItem } from '@skysmack/framework';
import { NgLodgingTypesMenu } from '../../ng-lodging-types-menu';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgLodgingTypesFieldsConfig } from '../../ng-lodging-types-fields-config';

@Component({
  selector: 'ss-lodging-types-index',
  templateUrl: './lodging-types-index.component.html'
})
export class LodgingTypesIndexComponent extends DocumentRecordIndexComponent<LodgingTypesAppState, LodgingType, number> implements OnInit {
  public areaKey: string = LODGING_TYPES_AREA_KEY;
  public titleExtras = true;
  public entityActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingTypesStore,
    public sidebarMenu: NgLodgingTypesMenu,
    public fieldsConfig: NgLodgingTypesFieldsConfig,
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
