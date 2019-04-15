import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgVerifyEmailFieldsConfig } from './ng-verify-email-fields-config';
import { Router } from '@angular/router';
import { toLocalObject } from '@skysmack/framework';
import { FormHelper } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

  public fields$;

  constructor(
    public fieldsConfig: NgVerifyEmailFieldsConfig,
    public router: Router
  ) { }

  ngOnInit() {
    const token = this.router.url.split('=')[1];
    if (token) {
      const tokenObject = toLocalObject(token);
      this.fields$ = this.fieldsConfig.getFields(undefined, tokenObject);
      this.submit({ token });
    } else {
      this.fields$ = this.fieldsConfig.getFields(undefined);
    }
  }

  ngOnDestroy() {

  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.submit(fh.form.value);
    }, false);
  }

  private submit(tokenObject: { token: string }) {
    const token = tokenObject.token;
    this.router.navigate(['/skysmack/recover-password'], { queryParams: { token } });
  }
}
