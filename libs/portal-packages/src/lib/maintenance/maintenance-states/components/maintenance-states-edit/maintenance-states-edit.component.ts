import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceState, MaintenanceStatesAppState } from '@skysmack/packages-maintenance';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgMaintenanceStatesActions, NgMaintenanceStatesStore } from '@skysmack/ng-maintenance';
import { NgMaintenanceStatesFieldsConfig } from '../../ng-maintenance-states-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-maintenance-states-edit',
  templateUrl: './maintenance-states-edit.component.html'
})
export class MaintenanceStatesEditComponent extends RecordFormComponent<MaintenanceStatesAppState, MaintenanceState, number> implements OnInit {

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
    this.setEditFields();
  }
}
