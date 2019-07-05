import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceState, MaintenanceStatesAppState, MAINTENANCE_STATES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgMaintenanceStatesActions, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { NgMaintenanceStatesMenu } from '../../ng-maintenance-states-menu';
import { NgMaintenanceStatesFieldsConfig } from '../../ng-maintenance-states-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Component({
  selector: 'ss-maintenance-states-index',
  templateUrl: './maintenance-states-index.component.html'
})
export class MaintenanceStatesIndexComponent extends RecordIndexComponent<MaintenanceStatesAppState, MaintenanceState, number> implements OnInit {

  public areaKey: string = MAINTENANCE_STATES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgMaintenanceStatesActions,
    public redux: NgSkysmackStore,
    public store: NgMaintenanceStatesStore,
    public sidebarMenu: NgMaintenanceStatesMenu,
    public fieldsConfig: NgMaintenanceStatesFieldsConfig,
    public title: EntityComponentPageTitle,
    public menuItemActionProviders: MenuItemActionProviders

  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
