import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentsAppState, ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { Assignment } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent, EntityActionProviders } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentsActions, NgAssignmentsStore, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { NgAssignmentsMenu } from '../../ng-assignments-menu';
import { NgAssignmentsFieldsConfig } from '../../ng-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-assignments-index',
  templateUrl: './assignments-index.component.html'
})
export class AssignmentsIndexComponent extends RecordIndexComponent<AssignmentsAppState, Assignment, number> implements OnInit {

  public areaKey: string = ASSIGNMENTS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentsActions,
    public skysmackStore: NgSkysmackStore,
    public store: NgAssignmentsStore,
    public sidebarMenu: NgAssignmentsMenu,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public assignmentTypesStore: NgAssignmentTypesStore,
    public assignmentTypesActions: NgAssignmentTypesActions,
    public title: EntityComponentPageTitle,
    public entityActionProviders: EntityActionProviders
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig, entityActionProviders, title);
  }

  ngOnInit() {
    super.ngOnInit();
    this.assignmentTypesActions.getPaged(this.packagePath, this.pagedQuery);
  }
}
