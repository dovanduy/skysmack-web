import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable, of } from 'rxjs';
import { CommercialAccountForgotPasswordFieldsConfig } from './commercial-account-forgot-password-fields-config';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-commercial-account-forgot-password',
  templateUrl: './commercial-account-forgot-password.component.html',
  styleUrls: ['./commercial-account-forgot-password.component.scss']
})
export class CommercialAccountForgotPasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public fieldsConfig: CommercialAccountForgotPasswordFieldsConfig,
    public router: Router
  ) { }

  ngOnInit() {
    this.fields$ = of(this.fieldsConfig.getFields());
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form);
      this.router.navigate(['account', 'dashboard']);
    }, false);
  }
}
