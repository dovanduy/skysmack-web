import { Component, OnInit } from '@angular/core';
import { AccessController, AccessControllersAppState } from '@skysmack/ng-axis-physical-access-control';
import { NgAccessControllersActions, NgAccessControllersStore } from '@skysmack/ng-axis-physical-access-control';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgAccessControllersFieldsConfig } from '../../ng-access-controllers-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-access-controllers-create',
  templateUrl: './access-controllers-create.component.html'
})
export class AccessControllersCreateComponent extends RecordFormComponent<AccessControllersAppState, AccessController, string> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAccessControllersActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAccessControllersFieldsConfig,
    public store: NgAccessControllersStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
