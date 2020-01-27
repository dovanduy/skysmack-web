import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDoorwaysPassCodesActions, NgDoorwaysPassCodesStore, DoorwayPassCodeKey } from '@skysmack/ng-doorways-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwayPassCode, DoorwaysPassCodesAppState, DOORWAYS_PASS_CODES_AREA_KEY } from '@skysmack/ng-doorways-pass-codes';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgDoorwaysPassCodesFieldsConfig } from '../../ng-doorways-pass-codes-fields-config';

@Component({
  selector: 'ss-doorways-pass-codes-index',
  templateUrl: './doorways-pass-codes-index.component.html'
})
export class DoorwaysPassCodesIndexComponent extends RecordIndexComponent<DoorwaysPassCodesAppState, DoorwayPassCode, DoorwayPassCodeKey> implements OnInit {
  public static COMPONENT_KEY = 'doorways-pass-codes-index';
  public componentKey = DoorwaysPassCodesIndexComponent.COMPONENT_KEY;

  public areaKey: string = DOORWAYS_PASS_CODES_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgDoorwaysPassCodesActions,
    public redux: NgSkysmackStore,
    public store: NgDoorwaysPassCodesStore,
    public fieldsConfig: NgDoorwaysPassCodesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
