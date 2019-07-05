import { Component, OnInit } from '@angular/core';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { NgUsersActions } from '@skysmack/ng-packages';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { RecordFormComponent } from '@skysmack/portal-ui';
import { NgUsersStore } from '@skysmack/ng-packages';
import { switchMap } from 'rxjs/operators';
import { NgUsersFieldsConfig } from '../../ng-users-fields-config';

@Component({
  selector: 'ss-users-edit',
  templateUrl: './users-edit.component.html'
})
export class UsersEditComponent extends RecordFormComponent<UsersAppState, User, number> implements OnInit {

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
      switchMap(entity => {
        this.selectedEntity = entity;
        this.fieldsConfig.mode = 'edit';
        return this.fieldsConfig.getFields(undefined, entity);
      })
    );
  }
}
