import { Component, OnInit } from '@angular/core';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgLodgingTypesFieldsConfig } from '../../ng-lodging-types-fields-config';

@Component({
  selector: 'ss-lodging-types-edit',
  templateUrl: './lodging-types-edit.component.html',
  styleUrls: ['./lodging-types-edit.component.scss']
})
export class LodgingTypesEditComponent extends DocumentRecordFormComponent<LodgingTypesAppState, LodgingType, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypesFieldsConfig,
    public store: NgLodgingTypesStore,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
