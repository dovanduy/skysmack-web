import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceState, MaintenanceStatesAppState } from '@skysmack/packages-maintenance';
import { NgMaintenanceStateFormDependencies, NgMaintenanceStatesActions, NgSkysmackStore, NgMaintenanceStatesFieldsConfig, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { DocumentRecordFormComponent, EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-maintenance-states-create',
  templateUrl: './maintenance-states-create.component.html',
  styleUrls: ['./maintenance-states-create.component.scss']
})
export class MaintenanceStatesCreateComponent extends RecordFormComponent<MaintenanceStatesAppState, MaintenanceState, number, NgMaintenanceStateFormDependencies> implements OnInit {


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgMaintenanceStatesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgMaintenanceStatesFieldsConfig,
    public store: NgMaintenanceStatesStore,

  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
