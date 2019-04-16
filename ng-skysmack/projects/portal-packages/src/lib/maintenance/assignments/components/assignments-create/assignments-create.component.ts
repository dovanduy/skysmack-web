import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, AssignmentsAppState } from '@skysmack/packages-maintenance';
import { NgAssignmentsActions, NgSkysmackStore, NgAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentsFieldsConfig } from '../../ng-assignments-fields-config';

@Component({
  selector: 'ss-assignments-create',
  templateUrl: './assignments-create.component.html'
})
export class AssignmentsCreateComponent extends RecordFormComponent<AssignmentsAppState, Assignment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public store: NgAssignmentsStore,
    public assignmentTypesActions: NgAssignmentTypesActions,

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
