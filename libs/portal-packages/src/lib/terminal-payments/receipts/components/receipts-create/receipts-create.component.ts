import { Component, OnInit } from '@angular/core';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentRecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgReceiptsActions } from '@skysmack/ng-packages';
import { NgReceiptsStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgReceiptsFieldsConfig } from '../../ng-receipts-fields-config';

@Component({
  selector: 'ss-receipts-create',
  templateUrl: './receipts-create.component.html'
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
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
