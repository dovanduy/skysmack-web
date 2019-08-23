import { Component, OnInit } from '@angular/core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgClientsFieldsConfig } from '../../ng-clients-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';
import { ClientsAppState, Client } from '@skysmack/packages-identities';
import { NgClientsActions, NgClientsStore } from '@skysmack/ng-identities';

@Component({
  selector: 'ss-clients-edit',
  templateUrl: './clients-edit.component.html'
})
export class ClientsEditComponent extends RecordFormComponent<ClientsAppState, Client, string> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgClientsActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgClientsFieldsConfig,
    public store: NgClientsStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setEditFields();
  }
}
