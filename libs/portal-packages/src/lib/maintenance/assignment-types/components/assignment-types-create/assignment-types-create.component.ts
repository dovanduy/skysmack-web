import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentType, AssignmentTypesAppState } from '@skysmack/packages-maintenance';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgAssignmentTypesActions, NgAssignmentTypesStore, NgMaintenanceStatesActions, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { NgAssignmentTypesFieldsConfig } from '../../ng-assignment-types-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-assignment-types-create',
  templateUrl: './assignment-types-create.component.html'
})
export class AssignmentTypesCreateComponent extends RecordFormComponent<AssignmentTypesAppState, AssignmentType, number> implements OnInit {
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
}
