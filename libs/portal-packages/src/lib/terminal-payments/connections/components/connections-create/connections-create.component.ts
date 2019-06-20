import { Component, OnInit } from '@angular/core';
import { ConnectionsAppState, Connection, ConnectionKey } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordFormComponent, EditorNavService } from '@skysmack/portal-ui';
import { NgConnectionsActions } from '@skysmack/ng-packages';
import { NgConnectionsStore } from '@skysmack/ng-packages';
import { NgConnectionsFieldsConfig } from '../../ng-connections-fields-config';

@Component({
  selector: 'ss-connections-create',
  templateUrl: './connections-create.component.html'
})
export class ConnectionsCreateComponent extends RecordFormComponent<ConnectionsAppState, Connection, ConnectionKey> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgConnectionsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgConnectionsFieldsConfig,
    public store: NgConnectionsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
