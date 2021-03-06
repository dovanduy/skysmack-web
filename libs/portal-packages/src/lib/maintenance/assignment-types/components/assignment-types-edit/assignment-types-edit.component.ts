import { Component, OnInit } from '@angular/core';
import { AssignmentTypesAppState, AssignmentType } from '@skysmack/packages-maintenance';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgAssignmentTypesStore, NgMaintenanceStatesStore, NgMaintenanceStatesActions } from '@skysmack/ng-maintenance';
import { NgAssignmentTypesFieldsConfig } from '../../ng-assignment-types-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-assignment-types-edit',
  templateUrl: './assignment-types-edit.component.html'
})
export class AssignmentTypesEditComponent extends RecordFormComponent<AssignmentTypesAppState, AssignmentType, number> implements OnInit {

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
}
