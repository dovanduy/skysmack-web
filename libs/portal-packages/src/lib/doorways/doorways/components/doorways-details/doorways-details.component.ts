import { Component, OnInit } from '@angular/core';
import { EditorNavService } from '@skysmack/portal-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgDoorwaysActions, NgDoorwaysStore } from '@skysmack/ng-doorways';
import { DoorwaysAppState } from '@skysmack/ng-doorways';
import { DetailsBaseComponent } from '@skysmack/portal-fields';
import { NgDoorwaysFieldsConfig } from '../../../ng-doorways-fields-config';

@Component({
  selector: 'ss-doorways-details',
  templateUrl: './doorways-details.component.html'
})
export class DoorwaysDetailsComponent extends DetailsBaseComponent<DoorwaysAppState, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public actions: NgDoorwaysActions,
    public store: NgDoorwaysStore,
    public fieldsConfig: NgDoorwaysFieldsConfig,
    public editorNavService: EditorNavService
  ) {
    super(router, activatedRoute, skysmackStore, actions, store, fieldsConfig, editorNavService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
