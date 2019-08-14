import { Component, OnInit } from '@angular/core';
import { TerminalPaymentReceipt, TerminalPaymentReceiptsAppState } from '@skysmack/packages-terminal-payments';
import { NgTerminalPaymentReceiptsActions, NgTerminalPaymentReceiptsStore } from '@skysmack/ng-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgTerminalPaymentReceiptsFieldsConfig } from '../../ng-terminal-payment-receipts-fields-config';

@Component({
  selector: 'ss-terminal-payment-receipts-create',
  templateUrl: './terminal-payment-receipts-create.component.html'
})
export class TerminalPaymentReceiptsCreateComponent extends DocumentRecordFormComponent<TerminalPaymentReceiptsAppState, TerminalPaymentReceipt, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalPaymentReceiptsActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgTerminalPaymentReceiptsFieldsConfig,
    public store: NgTerminalPaymentReceiptsStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, skysmackStore, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
    this.editorNavService.showEditorNav();
  }
}
