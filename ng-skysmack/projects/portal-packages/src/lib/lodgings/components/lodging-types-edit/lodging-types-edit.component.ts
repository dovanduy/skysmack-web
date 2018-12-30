import { Component, OnInit } from '@angular/core';
import { LodgingTypesAppState, LodgingType } from '@skysmack/packages-lodgings';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack/redux/ng-skysmack-store';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgLodgingTypesFieldsConfig, NgLodgingTypeFormDependencies } from 'lib/ng-packages/lodgings/ng-lodging-types-fields-config';
import { NgLodgingTypesActions } from 'lib/ng-packages/lodgings/redux/ng-lodging-types-actions';
import { NgLodgingTypesStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-types-store';

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
