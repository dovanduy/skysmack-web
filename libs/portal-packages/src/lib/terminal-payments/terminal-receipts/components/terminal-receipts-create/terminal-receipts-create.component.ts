import { Component, OnInit } from '@angular/core';
import { TerminalReceipt, TerminalReceiptsAppState } from '@skysmack/packages-terminal-payments';
import { NgTerminalReceiptsActions, NgTerminalReceiptsStore } from '@skysmack/ng-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-fields';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgTerminalReceiptsFieldsConfig } from '../../ng-terminal-receipts-fields-config';

@Component({
  selector: 'ss-terminal-receipts-create',
  templateUrl: './terminal-receipts-create.component.html'
})
export class TerminalReceiptsCreateComponent extends DocumentRecordFormComponent<TerminalReceiptsAppState, TerminalReceipt, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalReceiptsActions,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgTerminalReceiptsFieldsConfig,
    public store: NgTerminalReceiptsStore,
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
