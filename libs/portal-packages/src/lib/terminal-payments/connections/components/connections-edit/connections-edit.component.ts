import { Component, OnInit } from '@angular/core';
import { ConnectionsAppState, Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgConnectionsActions, NgConnectionsStore } from '@skysmack/ng-terminal-payments';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-connections-edit',
  templateUrl: './connections-edit.component.html'
})
export class ConnectionsEditComponent extends RecordFormComponent<ConnectionsAppState, Connection, ConnectionKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgConnectionsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgConnectionsFieldsConfig,
    public store: NgConnectionsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
