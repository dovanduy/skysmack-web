import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService, FormBaseComponent } from '@skysmack/portal-ui';
import { NgUsersActions, NgSkysmackStore, NgUsersStore, NgUsersRequests, NgSetPasswordFormDependencies, NgSetPasswordFieldsConfig } from '@skysmack/ng-packages';
import { User, UsersAppState } from '@skysmack/packages-identities';
import { FormHelper } from '@skysmack/ng-ui';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ss-portal-package-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent extends FormBaseComponent<UsersAppState, User, number, NgSetPasswordFormDependencies> implements OnInit {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public editorNavService: EditorNavService,
    public actions: NgUsersActions,
    public redux: NgSkysmackStore,
    public fieldsConfig: NgSetPasswordFieldsConfig,
    public store: NgUsersStore,
    public http: HttpClient,
    public requests: NgUsersRequests
  ) { super(router, activatedRoute, editorNavService, actions, redux, fieldsConfig); }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();
    this.fields = this.fieldsConfig.getFields();
  }

  public onSetPasswordSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.requests.setPassword(fh.form.getRawValue(), this.packagePath, this.entityId).subscribe(() => this.editorNavService.hideEditorNav());
    });
  }
}
