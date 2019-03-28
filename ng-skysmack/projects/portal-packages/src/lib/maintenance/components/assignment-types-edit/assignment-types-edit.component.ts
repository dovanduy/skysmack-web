import { Component, OnInit } from '@angular/core';
import { AssignmentTypesAppState, AssignmentType } from '@skysmack/packages-maintenance';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgSkysmackStore, NgAssignmentTypesFieldsConfig, NgAssignmentTypesStore, NgAssignmentTypeFormDependencies, NgMaintenanceStatesStore, NgMaintenanceStatesActions } from '@skysmack/ng-packages';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-assignment-types-edit',
  templateUrl: './assignment-types-edit.component.html',
  styleUrls: ['./assignment-types-edit.component.scss']
})
export class AssignmentTypesEditComponent extends RecordFormComponent<AssignmentTypesAppState, AssignmentType, number, NgAssignmentTypeFormDependencies> implements OnInit {

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
    this.setEditFields();
  }

  protected setEditFields() {
    this.maintenanceStateActions.getPaged(this.packagePath, this.pagedQuery);

    this.fields$ = combineLatest(
        this.initEditRecord(),
        this.skysmackStore.getEditorItem(),
        this.maintenanceStateStore.get(this.packagePath)
      ).pipe(
        map(values => {
          const entity = values[0];
          this.editorItem = values[1] as LocalObject<AssignmentType, number>;
          const availableMaintenanceStates = values[2];
          this.editorItem ? this.selectedEntity = this.editorItem : this.selectedEntity = entity;

          return this.fieldsConfig.getFields(this.selectedEntity, undefined, { availableMaintenanceStates });
        })
      );
  }
}
