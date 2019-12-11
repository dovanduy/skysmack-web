import { Component, OnInit } from '@angular/core';
import { AccessPoint, AccessPointsAppState } from '@skysmack/ng-axis-physical-access-control';
import { NgAccessPointsActions, NgAccessPointsStore } from '@skysmack/ng-axis-physical-access-control';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgAccessPointsFieldsConfig } from '../../ng-access-points-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-access-points-create',
  templateUrl: './access-points-create.component.html'
})
export class AccessPointsCreateComponent extends RecordFormComponent<AccessPointsAppState, AccessPoint, string> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgAccessPointsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgAccessPointsFieldsConfig,
    public store: NgAccessPointsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
