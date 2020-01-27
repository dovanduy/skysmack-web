import { Component, OnInit } from '@angular/core';
import { DoorwayRelation, DoorwayRelationsAppState, DoorwayRelationKey } from '@skysmack/ng-doorways';
import { NgDoorwayRelationsActions, NgDoorwayRelationsStore } from '@skysmack/ng-doorways';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgDoorwayRelationsFieldsConfig } from '../../ng-doorway-relations-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-doorway-relations-create',
  templateUrl: './doorway-relations-create.component.html'
})
export class DoorwayRelationsCreateComponent extends RecordFormComponent<DoorwayRelationsAppState, DoorwayRelation, DoorwayRelationKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgDoorwayRelationsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgDoorwayRelationsFieldsConfig,
    public store: NgDoorwayRelationsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
