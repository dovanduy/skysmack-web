import { Component, OnInit } from '@angular/core';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { Observable, of } from 'rxjs';
import { CommercialAccountConfirmEmailFieldsConfig } from './commercial-account-confirm-email-fields-config';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CommercialAccountService } from '../../services/commercial-account.service';
import { SubscriptionHandler } from '@skysmack/framework';

@Component({
  selector: 'ss-commercial-account-confirm-email',
  templateUrl: './commercial-account-confirm-email.component.html',
  styleUrls: ['./commercial-account-confirm-email.component.scss']
})
export class CommercialAccountConfirmEmailComponent implements OnInit {

  public fields$: Observable<Field[]>;
  public message: string;
  private subscriptionHandler = new SubscriptionHandler();


  constructor(
    public fieldsConfig: CommercialAccountConfirmEmailFieldsConfig,
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
      this.subscriptionHandler.register(this.service.confirmEmail(fh.form.getRawValue()).pipe(
        map(response => {
          if (response.status >= 200 && response.status <= 299) {
            this.message = 'Email confirmed. Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/', 'account', 'login']);
            }, 2000);
          } else {
            this.message = 'An error occurred. Please try again.'
          }
        }),
        take(1)
      ).subscribe());
    }, false);
  }
}
