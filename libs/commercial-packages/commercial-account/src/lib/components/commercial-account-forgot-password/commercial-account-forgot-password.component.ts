import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable, of } from 'rxjs';
import { CommercialAccountForgotPasswordFieldsConfig } from './commercial-account-forgot-password-fields-config';
import { Router } from '@angular/router';
import { CommercialAccountService } from '../../services';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-account-forgot-password',
  templateUrl: './commercial-account-forgot-password.component.html',
  styleUrls: ['./commercial-account-forgot-password.component.scss']
})
export class CommercialAccountForgotPasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;
  public message: string;

  constructor(
    public fieldsConfig: CommercialAccountForgotPasswordFieldsConfig,
    private router: Router,
    private service: CommercialAccountService
  ) { }

  ngOnInit() {
    this.fields$ = of(this.fieldsConfig.getFields(null, null));
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.service.requestResetPassword(fh.form.getRawValue().email).pipe(
        map(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.router.navigate(['/', 'account', 'reset-password'])
          } else {
            this.message = 'An error occurred. Please try again.'
          }
        }),
        take(1)
      ).subscribe();
    }, false);
  }
}
