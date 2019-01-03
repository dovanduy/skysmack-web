import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecurringAssignment, RecurringAssignmentsAppState } from '@skysmack/packages-maintenance';
import { PagedQuery } from '@skysmack/framework';
import { combineLatest } from 'rxjs';
import { map } from '@skysmack/framework/node_modules/rxjs/internal/operators/map';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgRecurringAssignmentFormDependencies, NgRecurringAssignmentsActions, NgSkysmackStore, NgRecurringAssignmentsFieldsConfig, NgRecurringAssignmentsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-recurring-assignments-create',
  templateUrl: './recurring-assignments-create.component.html',
  styleUrls: ['./recurring-assignments-create.component.scss']
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

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.actions.getPaged(this.packagePath, new PagedQuery());

    this.subscriptionHandler.register(combineLatest(
      this.store.get(this.packagePath)
    ).pipe(
      map(values => {
        const availableRecurringAssignments = values[0];
        return this.getFields(undefined, undefined, { availableRecurringAssignments });
      })
    ).subscribe(fields => this.fields = fields));
  }
}
