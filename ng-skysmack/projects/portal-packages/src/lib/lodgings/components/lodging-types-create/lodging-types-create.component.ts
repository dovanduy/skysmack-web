import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { NgLodgingTypesFieldsConfig, NgLodgingTypeFormDependencies, NgLodgingTypesStore, NgSkysmackStore, NgLodgingTypesActions } from '@skysmack/ng-packages';
import { EditorNavService, DocumentRecordFormComponent } from '@skysmack/portal-ui';

@Component({
  selector: 'ss-lodging-types-create',
  templateUrl: './lodging-types-create.component.html',
  styleUrls: ['./lodging-types-create.component.scss']
})
export class LodgingTypesCreateComponent extends DocumentRecordFormComponent<LodgingTypesAppState, LodgingType, number, NgLodgingTypeFormDependencies> implements OnInit {

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
    this.setCreateFields();
  }
}
