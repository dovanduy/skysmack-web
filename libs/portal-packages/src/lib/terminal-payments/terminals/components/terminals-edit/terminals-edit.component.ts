import { Component, OnInit } from '@angular/core';
import { Terminal, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { NgTerminalsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgTerminalsStore } from '@skysmack/ng-packages';
import { NgFieldActions } from '@skysmack/ng-framework';
import { NgTerminalsFieldsConfig } from '../../ng-terminals-fields-config';

@Component({
  selector: 'ss-terminals-edit',
  templateUrl: './terminals-edit.component.html'
})
export class TerminalsEditComponent extends DocumentRecordFormComponent<TerminalsAppState, Terminal, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgTerminalsFieldsConfig,
    public store: NgTerminalsStore,
    public fieldActions: NgFieldActions
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig, fieldActions);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
