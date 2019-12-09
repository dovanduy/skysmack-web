import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgDoorwaysOptionsFieldsConfig } from '../../ng-doorways-options-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { DoorwaysOptionsAppState, DoorwayOption, NgDoorwaysOptionsActions, NgDoorwaysOptionsStore } from '@skysmack/ng-doorways-pass-codes';

@Component({
  selector: 'ss-doorways-options-edit',
  templateUrl: './doorways-options-edit.component.html'
})
export class DoorwaysOptionsEditComponent extends RecordFormComponent<DoorwaysOptionsAppState, DoorwayOption, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgDoorwaysOptionsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgDoorwaysOptionsFieldsConfig,
    public store: NgDoorwaysOptionsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
