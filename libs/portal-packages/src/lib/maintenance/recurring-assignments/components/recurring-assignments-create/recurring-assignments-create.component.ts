import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgRecurringAssignmentsActions, NgRecurringAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-maintenance';
import { NgRecurringAssignmentsFieldsConfig } from '../../ng-recurring-assignments-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-recurring-assignments-create',
  templateUrl: './recurring-assignments-create.component.html'
})
export class RecurringAssignmentsCreateComponent extends RecordFormComponent<RecurringAssignmentsAppState, RecurringAssignment, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgRecurringAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgRecurringAssignmentsFieldsConfig,
    public store: NgRecurringAssignmentsStore,
    public assignmentTypeActions: NgAssignmentTypesActions

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
