import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, AssignmentsAppState } from '@skysmack/packages-maintenance';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentsActions, NgSkysmackStore, NgAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { PagedQuery } from '@skysmack/framework';
import { NgAssignmentsFieldsConfig } from '../../ng-assignments-fields-config';

@Component({
  selector: 'ss-assignments-edit',
  templateUrl: './assignments-edit.component.html'
})
export class AssignmentsEditComponent extends RecordFormComponent<AssignmentsAppState, Assignment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public store: NgAssignmentsStore,
    public assignmentTypesActions: NgAssignmentTypesActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.assignmentTypesActions.getPaged(this.packagePath, new PagedQuery());
    this.setEditFields();
  }
}
