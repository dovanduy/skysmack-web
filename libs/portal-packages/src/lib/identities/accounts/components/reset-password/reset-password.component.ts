import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormHelper } from '@skysmack/ng-dynamic-forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorNavService } from '@skysmack/portal-ui';
import { AccountAppState } from '@skysmack/packages-identities';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgAccountRequests } from '@skysmack/ng-identities';
import { BaseComponent } from '@skysmack/portal-fields';
import { NgResetPasswordFieldsConfig } from './ng-reset-password-fields-config';
import { map, catchError, take } from 'rxjs/operators';
import { API_DOMAIN_INJECTOR_TOKEN, ApiDomain, SubscriptionHandler } from '@skysmack/framework';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'ss-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent<AccountAppState, unknown> implements OnInit, OnDestroy {

  public fields$;
  protected subscriptionHandler = new SubscriptionHandler();


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public fieldsConfig: NgResetPasswordFieldsConfig,
    public editorNavService: EditorNavService,
    public accountRequest: NgAccountRequests,
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

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.subscriptionHandler.register(this.accountRequest.resetPassword(this.packagePath, fh.form.getRawValue()).pipe(
        map(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.router.navigate(['/', 'account', 'login']);
          } else {
            // TODO: Implement error message
            // this.message = 'An error occurred. Please try again.' 
          }
        }),
        take(1),
      ).subscribe());
    });
  }
}
