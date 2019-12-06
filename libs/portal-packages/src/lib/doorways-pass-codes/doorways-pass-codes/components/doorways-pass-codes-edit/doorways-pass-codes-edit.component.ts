import { Component, OnInit } from '@angular/core';
import { DoorwayPassCode, DoorwaysPassCodesAppState, DoorwayPassCodeKey } from '@skysmack/ng-doorways-pass-codes';
import { NgDoorwaysPassCodesActions, NgDoorwaysPassCodesStore } from '@skysmack/ng-doorways-pass-codes';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgDoorwaysPassCodesFieldsConfig } from '../../ng-doorways-pass-codes-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-doorways-pass-codes-edit',
  templateUrl: './doorways-pass-codes-edit.component.html'
})
export class DoorwaysPassCodesEditComponent extends RecordFormComponent<DoorwaysPassCodesAppState, DoorwayPassCode, DoorwayPassCodeKey> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgDoorwaysPassCodesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgDoorwaysPassCodesFieldsConfig,
    public store: NgDoorwaysPassCodesStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
