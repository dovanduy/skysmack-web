import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgLodgingsDoorwaysActions, NgLodgingsDoorwaysStore, LodgingDoorwayKey } from '@skysmack/ng-lodgings-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingDoorway, LodgingsDoorwaysAppState, LODGINGS_DOORWAYS_AREA_KEY } from '@skysmack/ng-lodgings-doorways';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgLodgingsDoorwaysFieldsConfig } from '../../ng-lodgings-doorways-fields-config';

@Component({
  selector: 'ss-lodgings-doorways-index',
  templateUrl: './lodgings-doorways-index.component.html'
})
export class LodgingsDoorwaysIndexComponent extends RecordIndexComponent<LodgingsDoorwaysAppState, LodgingDoorway, LodgingDoorwayKey> implements OnInit {
  public static COMPONENT_KEY = 'lodgings-doorways-index';
  public componentKey = LodgingsDoorwaysIndexComponent.COMPONENT_KEY;

  public areaKey: string = LODGINGS_DOORWAYS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgLodgingsDoorwaysActions,
    public redux: NgSkysmackStore,
    public store: NgLodgingsDoorwaysStore,
    public fieldsConfig: NgLodgingsDoorwaysFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
