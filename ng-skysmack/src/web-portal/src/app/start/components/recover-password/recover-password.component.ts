import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRecoverPasswordFieldsConfig } from './ng-recover-password-fields-config';
import { FormHelper } from '@skysmack/ng-ui';
import { Router } from '@angular/router';
import { toLocalObject } from '@skysmack/framework';

@Component({
  selector: 'ss-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {

  public fields$;

  constructor(
    public fieldsConfig: NgRecoverPasswordFieldsConfig,
    public router: Router
  ) { }

  ngOnInit() {
    const token = this.router.url.split('=')[1];
    if (token) {
      const tokenObject = toLocalObject(token);
      this.fields$ = this.fieldsConfig.getFields(undefined, tokenObject);
    } else {
      this.fields$ = this.fieldsConfig.getFields(undefined);
    }

  }

  ngOnDestroy() {

  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form.value);
    });
  }
}
