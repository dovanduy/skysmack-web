import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, AssignmentsAppState } from '@skysmack/packages-maintenance';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentFormDependencies, NgAssignmentsActions, NgSkysmackStore, NgAssignmentsFieldsConfig, NgAssignmentsStore, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ss-assignments-edit',
  templateUrl: './assignments-edit.component.html'
})
export class AssignmentsEditComponent extends RecordFormComponent<AssignmentsAppState, Assignment, number, NgAssignmentFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public store: NgAssignmentsStore,
    public assignmentTypesStore: NgAssignmentTypesStore,
    public assignmentTypesActions: NgAssignmentTypesActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
  public setEditFields() {
    this.assignmentTypesActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.initEditRecord(),
      this.skysmackStore.getEditorItem(),
      this.assignmentTypesStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const entity = values[0];
        this.editorItem = values[1] as LocalObject<Assignment, number>;
        const availableAssignmentTypes = values[2];
        this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

        return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableAssignmentTypes });
      })
    );
  }
}
