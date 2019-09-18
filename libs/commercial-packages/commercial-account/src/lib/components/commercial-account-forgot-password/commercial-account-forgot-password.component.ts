import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { CommercialAccountForgotPasswordFieldsConfig } from './commercial-account-forgot-password-fields-config';
import { CommercialAccountService } from '../../services/commercial-account.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-account-forgot-password',
  templateUrl: './commercial-account-forgot-password.component.html',
  styleUrls: ['./commercial-account-forgot-password.component.scss']
})
export class CommercialAccountForgotPasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;
  public message: string;
  public checkEmail$ = new BehaviorSubject(false);

  constructor(
    public fieldsConfig: CommercialAccountForgotPasswordFieldsConfig,
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
            this.checkEmail$.next(true);
          } else {
            this.message = 'An error occurred. Please try again.';
          }
        }),
        take(1)
      ).subscribe();
    }, false);
  }
}
