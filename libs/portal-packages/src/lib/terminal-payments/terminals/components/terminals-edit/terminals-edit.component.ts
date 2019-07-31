import { Component, OnInit } from '@angular/core';
import { Terminal, TerminalsAppState } from '@skysmack/packages-terminal-payments';
import { NgTerminalsActions, NgTerminalsStore } from '@skysmack/ng-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgTerminalsFieldsConfig } from '../../ng-terminals-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-terminals-edit',
  templateUrl: './terminals-edit.component.html'
})
export class TerminalsEditComponent extends RecordFormComponent<TerminalsAppState, Terminal, number> implements OnInit {
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgTerminalsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgTerminalsFieldsConfig,
    public store: NgTerminalsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
