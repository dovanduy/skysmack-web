import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState, RECURRING_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { RecordIndexComponent, EntityComponentPageTitle, EntityActionProviders, ENTITY_ACTIONS_EDIT, ENTITY_ACTIONS_DELETE } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgRecurringAssignmentsActions, NgRecurringAssignmentsStore } from '@skysmack/ng-packages';
import { NgRecurringAssignmentsMenu } from '../../ng-recurring-assignments-menu';
import { NgRecurringAssignmentsFieldsConfig } from '../../ng-recurring-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-recurring-assignments-index',
  templateUrl: './recurring-assignments-index.component.html'
})
export class RecurringAssignmentsIndexComponent extends RecordIndexComponent<RecurringAssignmentsAppState, RecurringAssignment, number> implements OnInit {

  public areaKey: string = RECURRING_ASSIGNMENTS_AREA_KEY;
  public titleExtras = true;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', ENTITY_ACTIONS_EDIT, 'edit'),
    new EntityAction().asEventAction(ENTITY_ACTIONS_DELETE, this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgRecurringAssignmentsActions,
    public redux: NgSkysmackStore,
    public store: NgRecurringAssignmentsStore,
    public sidebarMenu: NgRecurringAssignmentsMenu,
    public fieldsConfig: NgRecurringAssignmentsFieldsConfig,
    public entityActionProviders: EntityActionProviders,
    public title: EntityComponentPageTitle
    

  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders, title);

  }

  ngOnInit() {
    super.ngOnInit();
  }
}
