import { Component, OnInit } from '@angular/core';
import { CommercialAccountChangePasswordFieldsConfig } from './commercial-account-change-password-fields-config';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { CommercialAccountService } from '../../services/commercial-account.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { SubscriptionHandler } from '@skysmack/framework';

@Component({
  selector: 'ss-commercial-account-change-password',
  templateUrl: './commercial-account-change-password.component.html',
  styleUrls: ['./commercial-account-change-password.component.scss']
})
export class CommercialAccountChangePasswordComponent implements OnInit {

  public fields$: Observable<Field[]>;
  public message: string;
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    public fieldsConfig: CommercialAccountChangePasswordFieldsConfig,
    private service: CommercialAccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fields$ = this.fieldsConfig.getFields(null);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.message = null;
      this.subscriptionHandler.register(this.service.changePassword(fh.form.value).pipe(
        map(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.router.navigate(['/', 'account', 'dashboard'])
          } else {
            this.message = 'An error occurred. Please try again.'
          }
        }),
        take(1)
      ).subscribe());
    });
  }
}
