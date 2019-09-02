import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable, of } from 'rxjs';
import { CommercialAccountResetPasswordFieldsConfig } from './commercial-account-reset-password-fields-config';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-account-reset-password',
  templateUrl: './commercial-account-reset-password.component.html',
  styleUrls: ['./commercial-account-reset-password.component.scss']
})
export class CommercialAccountResetPasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;

  constructor(
    public fieldsConfig: CommercialAccountResetPasswordFieldsConfig,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fields$ = this.activatedRoute.queryParams.pipe(
      map(queryParam => {
        return this.fieldsConfig.getFields(queryParam['email'], queryParam['token']);
      })
    );
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      console.log(fh.form);
      this.router.navigate(['account', 'dashboard']);
    }, false);
  }
}
