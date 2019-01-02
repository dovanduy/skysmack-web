import { Component, OnInit } from '@angular/core';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgLodgingTypesFieldsConfig, NgLodgingTypeFormDependencies } from '@skysmack/ng-packages';
import { NgLodgingTypesActions } from '@skysmack/ng-packages';
import { NgLodgingTypesStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-lodging-types-edit',
  templateUrl: './lodging-types-edit.component.html',
  styleUrls: ['./lodging-types-edit.component.scss']
})
export class LodgingTypesEditComponent extends DocumentRecordFormComponent<LodgingTypesAppState, LodgingType, number, NgLodgingTypeFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingTypesActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgLodgingTypesFieldsConfig,
    public store: NgLodgingTypesStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}