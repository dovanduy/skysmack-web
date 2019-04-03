import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { PagedQuery } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAssignmentTypesStore, NgAssignmentTypesActions, NgRecurringAssignmentFormDependencies, NgRecurringAssignmentsActions, NgSkysmackStore, NgRecurringAssignmentsFieldsConfig, NgRecurringAssignmentsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-recurring-assignments-create',
  templateUrl: './recurring-assignments-create.component.html'
})
export class RecurringAssignmentsCreateComponent extends RecordFormComponent<RecurringAssignmentsAppState, RecurringAssignment, number, NgRecurringAssignmentFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgRecurringAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgRecurringAssignmentsFieldsConfig,
    public store: NgRecurringAssignmentsStore,
    public assignmentTypeStore: NgAssignmentTypesStore,
    public assignmentTypeActions: NgAssignmentTypesActions

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.assignmentTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.assignmentTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const availableAssignmentTypes = values[0];
        return this.fieldsConfig.getFields(undefined, undefined, { availableAssignmentTypes });
      })
    );
  }
}
