import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgAccountRequests } from '@skysmack/ng-identities';
import { BaseComponent } from '@skysmack/portal-fields';
import { NgResetPasswordFieldsConfig } from './ng-reset-password-fields-config';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgResetPasswordFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequest: NgAccountRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();

    this.fields$ = this.activatedRoute.queryParams.pipe(
      map(queryParam => {
        return this.fieldsConfig.getFields(queryParam['email'], queryParam['token']);
      })
    );
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form.value);
    });
  }
}
