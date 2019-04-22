import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceState, MaintenanceStatesAppState } from '@skysmack/packages-maintenance';
import { NgMaintenanceStatesActions, NgMaintenanceStatesStore } from '@skysmack/ng-packages';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgMaintenanceStatesFieldsConfig } from '../../ng-maintenance-states-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Component({
  selector: 'ss-maintenance-states-create',
  templateUrl: './maintenance-states-create.component.html'
})
export class MaintenanceStatesCreateComponent extends RecordFormComponent<MaintenanceStatesAppState, MaintenanceState, number> implements OnInit {


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
