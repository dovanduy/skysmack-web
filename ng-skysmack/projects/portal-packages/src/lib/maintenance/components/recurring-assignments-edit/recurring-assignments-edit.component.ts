import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgAssignmentTypesStore, NgRecurringAssignmentsActions, NgSkysmackStore, NgRecurringAssignmentsFieldsConfig, NgRecurringAssignmentsStore, NgRecurringAssignmentFormDependencies } from '@skysmack/ng-packages';
import { PagedQuery } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ss-recurring-assignments-edit',
  templateUrl: './recurring-assignments-edit.component.html'
})
export class RecurringAssignmentsEditComponent extends RecordFormComponent<RecurringAssignmentsAppState, RecurringAssignment, number, NgRecurringAssignmentFormDependencies> implements OnInit {

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
    this.setEditFields();
  }

  public setEditFields() {
    this.assignmentTypeActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditRecord(),
      this.assignmentTypeStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0];
        const availableAssignmentTypes = values[1];
        this.selectedEntity = entity;
        return this.fieldsConfig.getFields(entity, undefined, { availableAssignmentTypes });
      })
    );
  }
}
