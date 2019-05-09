import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceState, MaintenanceStatesAppState, MAINTENANCE_STATES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgMaintenanceStatesActions, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { NgMaintenanceStatesMenu } from '../../ng-maintenance-states-menu';
import { NgMaintenanceStatesFieldsConfig } from '../../ng-maintenance-states-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Component({
  selector: 'ss-maintenance-states-index',
  templateUrl: './maintenance-states-index.component.html'
})
export class MaintenanceStatesIndexComponent extends RecordIndexComponent<MaintenanceStatesAppState, MaintenanceState, number> implements OnInit {

  public areaKey: string = MAINTENANCE_STATES_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
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
    public entityActionProviders: EntityActionProviders

  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
