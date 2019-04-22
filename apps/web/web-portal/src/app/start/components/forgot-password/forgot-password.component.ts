import { Component, OnInit } from '@angular/core';
import { NgForgotPasswordFieldsConfig } from './ng-forgot-password-fields-config';
import { FormHelper } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public fields$;

  constructor(
    public fieldsConfig: NgForgotPasswordFieldsConfig
  ) { }

  ngOnInit() {
    this.fields$ = this.fieldsConfig.getFields(undefined);
  }

  ngOnDestroy() {

  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form.value);
    });
  }
}
