import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { Assignment, AssignmentsAppState } from '@skysmack/packages-maintenance';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgAssignmentsActions, NgSkysmackStore, NgAssignmentsStore, NgAssignmentTypesStore, NgAssignmentTypesActions } from '@skysmack/ng-packages';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentsFieldsConfig, NgAssignmentFormDependencies } from '../../ng-assignments-fields-config';

@Component({
  selector: 'ss-assignments-create',
  templateUrl: './assignments-create.component.html',
  styleUrls: ['./assignments-create.component.scss']
})
export class AssignmentsCreateComponent extends RecordFormComponent<AssignmentsAppState, Assignment, number, NgAssignmentFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentsFieldsConfig,
    public store: NgAssignmentsStore,
    public assignmentTypesStore: NgAssignmentTypesStore,
    public assignmentTypesActions: NgAssignmentTypesActions,

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
  public setCreateFields() {
    this.assignmentTypesActions.getPaged(this.packagePath, new PagedQuery());

    this.fields$ = combineLatest(
      this.assignmentTypesStore.get(this.packagePath),
      this.skysmackStore.getEditorItem()
    ).pipe(
      map(values => {
        const availableAssignmentTypes = values[0];
        const editorItem = values[1] as LocalObject<Assignment, number>;
        this.editorItem = editorItem;


        return this.fieldsConfig.getFields(this.editorItem, undefined, { availableAssignmentTypes });
      })
    );
  }
}