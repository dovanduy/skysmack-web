import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessPointsActions, NgAccessPointsStore } from '@skysmack/ng-axis-physical-access-control';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AccessPoint, AccessPointsAppState, ACCESS_POINTS_AREA_KEY } from '@skysmack/ng-axis-physical-access-control';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgAccessPointsFieldsConfig } from '../../ng-access-points-fields-config';

@Component({
  selector: 'ss-access-points-index',
  templateUrl: './access-points-index.component.html'
})
export class AccessPointsIndexComponent extends RecordIndexComponent<AccessPointsAppState, AccessPoint, string> implements OnInit {
  public static COMPONENT_KEY = 'access-points-index';
  public componentKey = AccessPointsIndexComponent.COMPONENT_KEY;
  public titleExtras = true;

  public areaKey: string = ACCESS_POINTS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessPointsActions,
    public redux: NgSkysmackStore,
    public store: NgAccessPointsStore,
    public fieldsConfig: NgAccessPointsFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
