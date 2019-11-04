import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { CommercialAccountResetPasswordFieldsConfig } from './commercial-account-reset-password-fields-config';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CommercialAccountService } from '../../services';
import { SubscriptionHandler } from '@skysmack/framework';

@Component({
  selector: 'ss-commercial-account-reset-password',
  templateUrl: './commercial-account-reset-password.component.html',
  styleUrls: ['./commercial-account-reset-password.component.scss']
})
export class CommercialAccountResetPasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;
  public message: string;
  private subscriptionHandler = new SubscriptionHandler();


  constructor(
    public fieldsConfig: CommercialAccountResetPasswordFieldsConfig,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private service: CommercialAccountService
  ) { }

  ngOnInit() {
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
      this.subscriptionHandler.register(this.service.resetPassword(fh.form.getRawValue()).pipe(
        map(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.router.navigate(['/', 'account', 'login']);
          } else {
            this.message = 'An error occurred. Please try again.'
          }
        }),
        take(1)
      ).subscribe());
    }, false);
  }
}
