import { Component, OnInit } from '@angular/core';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgUsersActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-ui';
import { NgUsersStore } from '@skysmack/ng-packages';
import { map } from 'rxjs/operators';
import { NgUsersFieldsConfig, NgUserFormDependencies } from '../../ng-users-fields-config';

@Component({
  selector: 'ss-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent extends RecordFormComponent<UsersAppState, User, number, NgUserFormDependencies> implements OnInit {

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
    this.setEditFields();
  }

  protected setEditFields() {
    this.fields$ = this.initEditRecord().pipe(
      map(entity => {
        this.selectedEntity = entity;
        this.fieldsConfig.mode = 'edit';
        return this.fieldsConfig.getFields(entity);
      })
    );
  }
}
