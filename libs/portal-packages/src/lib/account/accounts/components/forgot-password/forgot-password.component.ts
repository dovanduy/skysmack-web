import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForgotPasswordFieldsConfig } from './ng-forgot-password-fields-config';
import { FormHelper, Field } from '@skysmack/ng-ui';
import { Observable } from 'rxjs';
import { AccountAppState } from '@skysmack/packages-account';
import { BaseComponent, EditorNavService } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgAccountRequests } from '@skysmack/ng-packages';

@Component({
  selector: 'ss-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$: Observable<Field[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgForgotPasswordFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequest: NgAccountRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();
    this.fields$ = this.fieldsConfig.getFields(undefined);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.editorNavService.hideEditorNav();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form.value);
    });
  }
}
