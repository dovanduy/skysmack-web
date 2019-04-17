import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgRecurringAssignmentsActions, NgSkysmackStore, NgRecurringAssignmentsStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { NgRecurringAssignmentsFieldsConfig } from '../../ng-recurring-assignments-fields-config';


@Component({
  selector: 'ss-recurring-assignments-edit',
  templateUrl: './recurring-assignments-edit.component.html'
})
export class RecurringAssignmentsEditComponent extends RecordFormComponent<RecurringAssignmentsAppState, RecurringAssignment, number> implements OnInit {

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
    this.setEditFields();
  }
}
