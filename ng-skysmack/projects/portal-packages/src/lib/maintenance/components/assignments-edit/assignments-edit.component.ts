import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, AssignmentsAppState } from '@skysmack/packages-maintenance';
import { DocumentRecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentFormDependencies, NgAssignmentsActions, NgSkysmackStore, NgAssignmentsFieldsConfig, NgAssignmentsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-assignments-edit',
  templateUrl: './assignments-edit.component.html',
  styleUrls: ['./assignments-edit.component.scss']
})
export class AssignmentsEditComponent extends DocumentRecordFormComponent<AssignmentsAppState, Assignment, number, NgAssignmentFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public store: NgAssignmentsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
