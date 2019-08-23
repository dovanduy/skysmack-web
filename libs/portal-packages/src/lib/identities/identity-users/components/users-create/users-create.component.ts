import { Component, OnInit } from '@angular/core';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgUsersActions, NgUsersStore } from '@skysmack/ng-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgUsersFieldsConfig } from '../../ng-users-fields-config';
import { RecordFormComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-users-create',
  templateUrl: './users-create.component.html'
})
export class UsersCreateComponent extends RecordFormComponent<UsersAppState, User, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgUsersActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgUsersFieldsConfig,
    public store: NgUsersStore,
  ) {
    super(router, activatedRoute, editorNavService, actions, redux, store, fieldsConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fieldsConfig.mode = 'create';
    this.setCreateFields();
  }

}
