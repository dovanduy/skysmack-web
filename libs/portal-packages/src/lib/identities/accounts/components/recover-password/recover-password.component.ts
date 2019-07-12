import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRecoverPasswordFieldsConfig } from './ng-recover-password-fields-config';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { Router, ActivatedRoute } from '@angular/router';
import { toLocalObject } from '@skysmack/framework';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgAccountRequests } from '@skysmack/ng-packages';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgRecoverPasswordFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequest: NgAccountRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.editorNavService.showEditorNav();

    const token = this.router.url.split('=')[1];
    if (token) {
      const tokenObject = toLocalObject(token);
      this.fields$ = this.fieldsConfig.getFields(undefined, tokenObject);
    } else {
      this.fields$ = this.fieldsConfig.getFields(undefined);
    }
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
