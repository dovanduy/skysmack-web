import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTION_DETAILS, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgDoorwaysStore, NgDoorwaysActions, DoorwaysPermissions } from '@skysmack/ng-doorways';
import { Doorway, DoorwaysAppState, DOORWAYS_AREA_KEY } from '@skysmack/ng-doorways';
import { MenuItem, LocalObject } from '@skysmack/framework';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgDoorwaysFieldsConfig } from '../../../ng-doorways-fields-config';
import { DocumentRecordIndexComponent } from '@skysmack/portal-fields';
import { DoorwaysDetailsComponent } from '../doorways-details/doorways-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ss-doorways-index',
  templateUrl: './doorways-index.component.html'
})
export class DoorwaysIndexComponent extends DocumentRecordIndexComponent<DoorwaysAppState, Doorway, number> implements OnInit {
  public static COMPONENT_KEY = 'doorways-index';
  public componentKey = DoorwaysIndexComponent.COMPONENT_KEY;

  public areaKey: string = DOORWAYS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTION_DETAILS, (_this: DoorwaysIndexComponent, value: LocalObject<Doorway, number>) => {
      _this.dialog.open(DoorwaysDetailsComponent, {
        width: '500px',
        data: { entityId: value.object.id }
      });
    }, 'list', this),
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit').setPermissions([
      DoorwaysPermissions.updateDoorways,
    ]),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this).setPermissions([
      DoorwaysPermissions.removeDoorways
    ])
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgDoorwaysActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgDoorwaysStore,
    public fieldsConfig: NgDoorwaysFieldsConfig,
    public fieldActions: NgFieldActions,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders,
    private dialog: MatDialog
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, fieldActions, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}