import { Component, OnInit } from '@angular/core';
import { Terminal, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { NgTerminalsActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { DocumentRecordFormComponent } from '@skysmack/portal-ui';
import { NgTerminalsStore } from '@skysmack/ng-packages';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { NgTerminalsFieldsConfig, NgTerminalFormDependencies } from '../../ng-terminals-fields-config';

@Component({
  selector: 'ss-terminals-create',
  templateUrl: './terminals-create.component.html',
  styleUrls: ['./terminals-create.component.scss']
})
export class TerminalsCreateComponent extends DocumentRecordFormComponent<TerminalsAppState, Terminal, number, NgTerminalFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgTerminalsFieldsConfig,
    public store: NgTerminalsStore,
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
