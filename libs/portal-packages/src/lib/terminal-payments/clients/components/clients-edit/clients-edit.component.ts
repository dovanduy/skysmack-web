import { Component, OnInit } from '@angular/core';
import { ClientsAppState, Client } from '@skysmack/packages-terminal-payments';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService, RecordFormComponent } from '@skysmack/portal-ui';
import { NgClientsActions } from '@skysmack/ng-packages';
import { NgClientsStore } from '@skysmack/ng-packages';
import { NgClientsFieldsConfig } from '../../ng-clients-fields-config';

@Component({
  selector: 'ss-clients-edit',
  templateUrl: './clients-edit.component.html'
})
export class ClientsEditComponent extends RecordFormComponent<ClientsAppState, Client, number> implements OnInit {

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
