import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState, RECURRING_ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { RecordIndexComponent, EntityComponentPageTitle, EntityActionProviders } from '@skysmack/portal-ui';
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

  public area: string = RECURRING_ASSIGNMENTS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgRecurringAssignmentsActions,
    public redux: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgRecurringAssignmentsStore,
    public sidebarMenu: NgRecurringAssignmentsMenu,
    public fieldsConfig: NgRecurringAssignmentsFieldsConfig,
    public entityActionProviders: EntityActionProviders

  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig, entityActionProviders);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
