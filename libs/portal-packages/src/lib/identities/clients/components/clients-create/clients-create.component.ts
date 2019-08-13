import { Component, OnInit } from '@angular/core';
import { ClientsAppState, Client } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgClientsActions, NgClientsStore } from '@skysmack/ng-terminal-payments';
import { NgClientsFieldsConfig } from '../../ng-clients-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-clients-create',
  templateUrl: './clients-create.component.html'
})
export class ClientsCreateComponent extends RecordFormComponent<ClientsAppState, Client, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgClientsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgClientsFieldsConfig,
    public store: NgClientsStore
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setCreateFields();
  }
}
