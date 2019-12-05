import { Component, OnInit } from '@angular/core';
import { Doorway, DoorwaysAppState } from '@skysmack/ng-doorways';
import { NgDoorwaysActions, NgDoorwaysStore } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgDoorwaysFieldsConfig } from '../../../ng-doorways-fields-config';

@Component({
  selector: 'ss-doorways-edit',
  templateUrl: './doorways-edit.component.html'
})
export class DoorwaysEditComponent extends DocumentRecordFormComponent<DoorwaysAppState, Doorway, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgDoorwaysActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgDoorwaysFieldsConfig,
    public store: NgDoorwaysStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
