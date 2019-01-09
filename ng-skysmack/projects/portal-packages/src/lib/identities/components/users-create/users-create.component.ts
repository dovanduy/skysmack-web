import { Component, OnInit } from '@angular/core';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgUsersActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgUsersFieldsConfig, NgUserFormDependencies } from '@skysmack/ng-packages';
import { RecordFormComponent } from '@skysmack/portal-ui';
import { NgUsersStore } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent extends RecordFormComponent<UsersAppState, User, number, NgUserFormDependencies> implements OnInit {

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
    this.setCreateFields();
  }

}
