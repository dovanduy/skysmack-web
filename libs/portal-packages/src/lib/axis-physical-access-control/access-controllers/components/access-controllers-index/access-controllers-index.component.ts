import { Component, OnInit } from '@angular/core';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgAccessControllersActions, NgAccessControllersStore } from '@skysmack/ng-axis-physical-access-control';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AccessController, AccessControllersAppState, ACCESS_CONTROLLERS_AREA_KEY } from '@skysmack/ng-axis-physical-access-control';
import { MenuItem } from '@skysmack/framework';
import { RecordIndexComponent } from '@skysmack/portal-fields';
import { NgAccessControllersFieldsConfig } from '../../ng-access-controllers-fields-config';

@Component({
  selector: 'ss-access-controllers-index',
  templateUrl: './access-controllers-index.component.html'
})
export class AccessControllersIndexComponent extends RecordIndexComponent<AccessControllersAppState, AccessController, string> implements OnInit {
  public static COMPONENT_KEY = 'access-controllers-index';
  public componentKey = AccessControllersIndexComponent.COMPONENT_KEY;
  public titleExtras = true;

  public areaKey: string = ACCESS_CONTROLLERS_AREA_KEY;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAccessControllersActions,
    public redux: NgSkysmackStore,
    public store: NgAccessControllersStore,
    public fieldsConfig: NgAccessControllersFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
