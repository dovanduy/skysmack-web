import { Component, OnInit } from '@angular/core';
import { Application, ApplicationsAppState } from '@skysmack/packages-identities';
import { NgApplicationsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { NgApplicationsStore } from '@skysmack/ng-packages';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgApplicationsFormFieldsConfig } from '../../ng-applications-form-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-applications-create',
  templateUrl: './applications-create.component.html'
})
export class ApplicationsCreateComponent extends RecordFormComponent<ApplicationsAppState, Application, number> implements OnInit {

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
    this.setCreateFields();
  }

}
