import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForgotPasswordFieldsConfig } from './ng-forgot-password-fields-config';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { AccountAppState } from '@skysmack/packages-identities';
import { EditorNavService } from '@skysmack/portal-ui';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgAccountRequests } from '@skysmack/ng-identities';
import { map, take } from 'rxjs/operators';
import { BaseComponent } from '@skysmack/portal-fields';

@Component({
  selector: 'ss-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$: Observable<Field[]>;
  public message: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgForgotPasswordFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequests: NgAccountRequests
  ) {
    super(router, activatedRoute, skysmackStore);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fields$ = this.fieldsConfig.getFields(undefined);
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.accountRequests.forgotPassword(this.packagePath, fh.form.value).pipe(
        map(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.router.navigate([this.packagePath])
          } else {
            this.message = 'An error occurred. Please try again.'
          }
        }),
        take(1)
      ).subscribe();
    });
  }
}