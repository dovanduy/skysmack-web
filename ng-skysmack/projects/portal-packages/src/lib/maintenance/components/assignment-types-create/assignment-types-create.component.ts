import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentType, AssignmentTypesAppState } from '@skysmack/packages-maintenance';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgSkysmackStore, NgAssignmentTypesFieldsConfig, NgAssignmentTypesStore, NgAssignmentTypeFormDependencies, NgMaintenanceStatesActions, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-assignment-types-create',
  templateUrl: './assignment-types-create.component.html',
  styleUrls: ['./assignment-types-create.component.scss']
})
export class AssignmentTypesCreateComponent extends RecordFormComponent<AssignmentTypesAppState, AssignmentType, number, NgAssignmentTypeFormDependencies> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAssignmentTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAssignmentTypesFieldsConfig,
    public store: NgAssignmentTypesStore,
    public maintenanceStateActions: NgMaintenanceStatesActions,
    public maintenanceStateStore: NgMaintenanceStatesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }

  public setCreateFields() {
    this.maintenanceStateActions.getPaged(this.packagePath, this.pagedQuery);

    this.fields$ = combineLatest(
      this.skysmackStore.getEditorItem(),
      this.maintenanceStateStore.get(this.packagePath)
    ).pipe(
      map(values => {
        const editorItem = values[0];
        const availableMaintenanceStates = values[1];
        this.editorItem = editorItem as LocalObject<AssignmentType, number>;

        return this.fieldsConfig.getFields(undefined, undefined, { availableMaintenanceStates });
      })
    );
  }
}
