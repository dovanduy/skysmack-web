import { Component, OnInit } from '@angular/core';
import { LodgingDoorway, LodgingsDoorwaysAppState, LodgingDoorwayKey } from '@skysmack/ng-lodgings-doorways';
import { NgLodgingsDoorwaysActions, NgLodgingsDoorwaysStore } from '@skysmack/ng-lodgings-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgLodgingsDoorwaysFieldsConfig } from '../../ng-lodgings-doorways-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-lodgings-doorways-edit',
  templateUrl: './lodgings-doorways-edit.component.html'
})
export class LodgingsDoorwaysEditComponent extends RecordFormComponent<LodgingsDoorwaysAppState, LodgingDoorway, LodgingDoorwayKey> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingsDoorwaysActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingsDoorwaysFieldsConfig,
    public store: NgLodgingsDoorwaysStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
