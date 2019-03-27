import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentsAppState, ASSIGNMENTS_AREA_KEY } from '@skysmack/packages-maintenance';
import { Assignment } from '@skysmack/packages-maintenance';
import { EntityComponentPageTitle, RecordIndexComponent } from '@skysmack/portal-ui';
import { EntityAction } from '@skysmack/ng-ui';
import { NgAssignmentsActions, NgSkysmackStore, NgAssignmentsStore, NgAssignmentsFieldsConfig, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { NgAssignmentsMenu } from '../../ng-assignments-menu';
import { LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-assignments-index',
  templateUrl: './assignments-index.component.html',
  styleUrls: ['./assignments-index.component.scss']
})
export class AssignmentsIndexComponent extends RecordIndexComponent<AssignmentsAppState, Assignment, number> implements OnInit {

  public area: string = ASSIGNMENTS_AREA_KEY;
  public entityActions: EntityAction[] = [
    new EntityAction().asUrlAction('edit', 'Edit', 'edit'),
    new EntityAction().asEventAction('Delete', this.delete, 'delete', this)
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public actions: NgAssignmentsActions,
    public skysmackStore: NgSkysmackStore,
    public title: EntityComponentPageTitle,
    public store: NgAssignmentsStore,
    public sidebarMenu: NgAssignmentsMenu,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public assignmentTypesStore: NgAssignmentTypesStore,
    public assignmentTypesActions: NgAssignmentTypesActions,
  ) {
    super(router, activatedRoute, actions, skysmackStore, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.title.setTitle(this.packagePath);
    this.assignmentTypesActions.getPaged(this.packagePath, this.pagedQuery);
  }
}
