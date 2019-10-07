import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsSchedule, AssignmentsSchedulesAppState } from '@skysmack/packages-maintenance';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentsSchedulesActions, NgAssignmentsSchedulesStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { NgAssignmentsSchedulesFieldsConfig } from '../../ng-assignments-schedules-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';


@Component({
  selector: 'ss-assignments-schedules-edit',
  templateUrl: './assignments-schedules-edit.component.html'
})
export class AssignmentsSchedulesEditComponent extends RecordFormComponent<AssignmentsSchedulesAppState, AssignmentsSchedule, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentsSchedulesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentsSchedulesFieldsConfig,
    public store: NgAssignmentsSchedulesStore,
    public assignmentTypeActions: NgAssignmentTypesActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
