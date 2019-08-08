import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { NgUsersActions, NgUsersStore, NgUsersRequests } from '@skysmack/ng-identities';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { NgSetPasswordFieldsConfig } from '../../ng-set-password-fields-config';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { FormBaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-portal-package-set-password',
  templateUrl: './set-password.component.html'
})
export class SetPasswordComponent extends FormBaseComponent<UsersAppState, User, number> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgUsersActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSetPasswordFieldsConfig,
    public store: NgUsersStore,
    public requests: NgUsersRequests
  ) { super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig); }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();
    this.fields$ = this.fieldsConfig.getFields(undefined);
  }

  public onSetPasswordSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.requests.setPassword(fh.form.getRawValue(), this.packagePath, this.entityId).subscribe(() => this.editorNavService.hideEditorNav());
    });
  }
}
