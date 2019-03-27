import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceState, MaintenanceStatesAppState, MAINTENANCE_STATES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgMaintenanceStatesActions, NgSkysmackStore, NgMaintenanceStatesStore, NgMaintenanceStatesFieldsConfig } from '@skysmack/ng-packages';
import { NgMaintenanceStatesMenu } from './../../ng-maintenance-states-menu';


@Component({
  selector: 'ss-maintenance-states-index',
  templateUrl: './maintenance-states-index.component.html',
  styleUrls: ['./maintenance-states-index.component.scss']
})
export class MaintenanceStatesIndexComponent extends RecordIndexComponent<MaintenanceStatesAppState, MaintenanceState, number> implements OnInit {

  public area: string = MAINTENANCE_STATES_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgMaintenanceStatesActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgMaintenanceStatesStore,
    public sidebarMenu: NgMaintenanceStatesMenu,
    public fieldsConfig: NgMaintenanceStatesFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
