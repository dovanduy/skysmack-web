import { Component, OnInit } from '@angular/core';
import { Application, ApplicationsAppState } from '@skysmack/packages-identities';
import { NgApplicationsActions, NgApplicationsStore } from '@skysmack/ng-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgApplicationsFormFieldsConfig } from '../../ng-applications-form-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-applications-edit',
  templateUrl: './applications-edit.component.html'
})
export class ApplicationsEditComponent extends RecordFormComponent<ApplicationsAppState, Application, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgApplicationsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgApplicationsFormFieldsConfig,
    public store: NgApplicationsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fieldsConfig.mode = 'edit';
    this.setEditFields();
  }
}
