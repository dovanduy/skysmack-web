import { Component, OnInit } from '@angular/core';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentRecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgReceiptsActions } from '@skysmack/ng-packages';
import { NgReceiptsStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgReceiptsFieldsConfig } from '../../ng-receipts-fields-config';

@Component({
  selector: 'ss-receipts-create',
  templateUrl: './receipts-create.component.html',
  styleUrls: ['./receipts-create.component.scss']
})
export class ReceiptsCreateComponent extends DocumentRecordFormComponent<ReceiptsAppState, Receipt, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgReceiptsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgReceiptsFieldsConfig,
    public store: NgReceiptsStore,
    public fieldActions: NgFieldActions,
    public fieldStore: NgFieldStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions, fieldStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
