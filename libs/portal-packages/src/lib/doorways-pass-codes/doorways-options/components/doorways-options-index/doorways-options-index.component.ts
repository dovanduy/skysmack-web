import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgDoorwaysOptionsFieldsConfig } from '../../ng-doorways-options-fields-config';
import { DoorwaysOptionsAppState, DoorwayOption, DOORWAYS_OPTIONS_AREA_KEY, NgDoorwaysOptionsActions, NgDoorwaysOptionsStore } from '@skysmack/ng-doorways-pass-codes';

@Component({
  selector: 'ss-doorways-options-index',
  templateUrl: './doorways-options-index.component.html'
})
export class DoorwaysOptionsIndexComponent extends RecordIndexComponent<DoorwaysOptionsAppState, DoorwayOption, number> implements OnInit {
  public static COMPONENT_KEY = 'doorways-options-index';
  public componentKey = DoorwaysOptionsIndexComponent.COMPONENT_KEY;
  public titleExtras = true;

  public areaKey: string = DOORWAYS_OPTIONS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgDoorwaysOptionsActions,
    public redux: NgSkysmackStore,
    public store: NgDoorwaysOptionsStore,
    public fieldsConfig: NgDoorwaysOptionsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
