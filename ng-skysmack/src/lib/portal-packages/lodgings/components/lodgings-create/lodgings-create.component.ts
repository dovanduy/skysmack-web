import { Component, OnInit } from '@angular/core';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from 'lib/portal-ui/components/common/container/editor-nav.service';
import { DocumentRecordFormComponent } from 'lib/portal-ui/base-components/record-components/document-record-form-component';
import { LodgingsAppState, Lodging } from '@skysmack/packages-lodgings';
import { NgLodgingsActions } from 'lib/ng-packages/lodgings/redux/ng-lodgings-actions';
import { NgLodgingsFieldsConfig } from 'lib/ng-packages/lodgings/ng-lodgings-fields-config';
import { NgLodgingsStore } from 'lib/ng-packages/lodgings/redux/ng-lodgings-store';
@Component({
  selector: 'ss-lodgings-create',
  templateUrl: './lodgings-create.component.html',
  styleUrls: ['./lodgings-create.component.scss']
})
export class LodgingsCreateComponent extends DocumentRecordFormComponent<LodgingsAppState, Lodging, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgLodgingsActions,
    public redux: NgSkysmackRedux,
    public fieldsConfig: NgLodgingsFieldsConfig,
    public store: NgLodgingsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initDocumentRecordCreateComponent();
  }

}
