import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingTypesAppState, LodgingType, LODGING_TYPES_AREA_KEY } from '@skysmack/packages-lodgings';
import { NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-lodgings';
import { MenuItem } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgLodgingTypesFieldsConfig } from '../../ng-lodging-types-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodging-types-index',
  templateUrl: './lodging-types-index.component.html'
})
export class LodgingTypesIndexComponent extends DocumentRecordIndexComponent<LodgingTypesAppState, LodgingType, number> implements OnInit {
  public static COMPONENT_KEY = 'lodging-types-index';
  public componentKey = LodgingTypesIndexComponent.COMPONENT_KEY;

  public areaKey: string = LODGING_TYPES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingTypesActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingTypesStore,
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
