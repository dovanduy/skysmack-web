import { Component, OnInit } from '@angular/core';
import { Lodging, LodgingsAppState } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from 'lib/ng-packages/lodgings/redux/ng-lodgings-actions';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { NgLodgingsStore } from 'lib/ng-packages/lodgings';
import { NgLodgingTypesFieldsConfig } from 'lib/ng-packages/lodgings/ng-lodging-types-fields-config';

@Component({
  selector: 'ss-lodging-types-create',
  templateUrl: './lodging-types-create.component.html',
  styleUrls: ['./lodging-types-create.component.scss']
})
export class LodgingTypesCreateComponent extends DocumentRecordFormComponent<LodgingsAppState, Lodging, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingsActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgLodgingTypesFieldsConfig,
    public store: NgLodgingsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDocumentRecordCreateComponent();
  }

}
