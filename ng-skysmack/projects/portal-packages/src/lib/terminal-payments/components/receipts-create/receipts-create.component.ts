import { Component, OnInit } from '@angular/core';
import { ReceiptsAppState, Receipt } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentRecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgReceiptsFieldsConfig, NgReceiptFormDependencies } from '@skysmack/ng-packages';
import { NgReceiptsActions } from '@skysmack/ng-packages';
import { NgReceiptsStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-receipts-create',
  templateUrl: './receipts-create.component.html',
  styleUrls: ['./receipts-create.component.scss']
})
export class ReceiptsCreateComponent extends DocumentRecordFormComponent<ReceiptsAppState, Receipt, number, NgReceiptFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgReceiptsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgReceiptsFieldsConfig,
    public store: NgReceiptsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
