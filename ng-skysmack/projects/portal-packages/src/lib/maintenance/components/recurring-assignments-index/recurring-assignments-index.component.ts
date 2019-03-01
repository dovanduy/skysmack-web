import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { RecordIndexComponent, EntityComponentPageTitle } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgRecurringAssignmentsActions, NgSkysmackStore, NgRecurringAssignmentsStore, NgRecurringAssignmentsFieldsConfig } from '@skysmack/ng-packages';
import { NgRecurringAssignmentsMenu } from './../../ng-recurring-assignments-menu';

@Component({
  selector: 'ss-recurring-assignments-index',
  templateUrl: './recurring-assignments-index.component.html',
  styleUrls: ['./recurring-assignments-index.component.scss']
})
export class RecurringAssignmentsIndexComponent extends RecordIndexComponent<RecurringAssignmentsAppState, RecurringAssignment, number> implements OnInit {

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
    public fieldsConfig: NgRecurringAssignmentsFieldsConfig
  ) {
    super(router, activatedRoute, actions, redux, store, fieldsConfig);

  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
  }
}
