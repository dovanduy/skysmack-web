import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsSchedule, AssignmentsSchedulesAppState, ASSIGNMENTS_SCHEDULES_AREA_KEY } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, MenuItemActionProviders, MENU_ITEM_ACTIONS_EDIT, MENU_ITEM_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { MenuItem } from '@skysmack/framework';
import { NgAssignmentsSchedulesActions, NgAssignmentsSchedulesStore } from '@skysmack/ng-maintenance';
import { NgAssignmentsSchedulesFieldsConfig } from '../../ng-assignments-schedules-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordIndexComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-assignments-schedules-index',
  templateUrl: './assignments-schedules-index.component.html'
})
export class AssignmentsSchedulesIndexComponent extends RecordIndexComponent<AssignmentsSchedulesAppState, AssignmentsSchedule, number> implements OnInit {
  public static COMPONENT_KEY = 'assignments-schedules-index';
  public componentKey = AssignmentsSchedulesIndexComponent.COMPONENT_KEY;

  public areaKey: string = ASSIGNMENTS_SCHEDULES_AREA_KEY;
  public titleExtras = true;
  public menuItemActions: MenuItem[] = [
    new MenuItem().asUrlAction('edit', MENU_ITEM_ACTIONS_EDIT, 'edit'),
    new MenuItem().asEventAction(MENU_ITEM_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentsSchedulesActions,
    public redux: NgSkysmackStore,
    public store: NgAssignmentsSchedulesStore,
    public fieldsConfig: NgAssignmentsSchedulesFieldsConfig,
    public menuItemActionProviders: MenuItemActionProviders,
    public title: EntityComponentPageTitle


  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, menuItemActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
