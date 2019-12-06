import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDoorwayRelationsActions, NgDoorwayRelationsStore, DoorwayRelationKey } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwayRelation, DoorwayRelationsAppState, DOORWAY_RELATIONS_AREA_KEY } from '@skysmack/ng-doorways';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgDoorwayRelationsFieldsConfig } from '../../ng-doorway-relations-fields-config';

@Component({
  selector: 'ss-doorway-relations-index',
  templateUrl: './doorway-relations-index.component.html'
})
export class DoorwayRelationsIndexComponent extends RecordIndexComponent<DoorwayRelationsAppState, DoorwayRelation, DoorwayRelationKey> implements OnInit {
  public static COMPONENT_KEY = 'doorway-relations-index';
  public titleExtras = true;
  public componentKey = DoorwayRelationsIndexComponent.COMPONENT_KEY;

  public areaKey: string = DOORWAY_RELATIONS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgDoorwayRelationsActions,
    public redux: NgSkysmackStore,
    public store: NgDoorwayRelationsStore,
    public fieldsConfig: NgDoorwayRelationsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
