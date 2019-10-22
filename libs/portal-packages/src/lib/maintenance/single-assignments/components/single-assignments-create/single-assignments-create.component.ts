import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleAssignment, SingleAssignmentsAppState } from '@skysmack/packages-maintenance';
import { NgSingleAssignmentsActions, NgSingleAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgSingleAssignmentsFieldsConfig } from '../../ng-single-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-single-assignments-create',
  templateUrl: './single-assignments-create.component.html'
})
export class SingleAssignmentsCreateComponent extends RecordFormComponent<SingleAssignmentsAppState, SingleAssignment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgSingleAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSingleAssignmentsFieldsConfig,
    public store: NgSingleAssignmentsStore,
    public assignmentTypesActions: NgAssignmentTypesActions,

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
