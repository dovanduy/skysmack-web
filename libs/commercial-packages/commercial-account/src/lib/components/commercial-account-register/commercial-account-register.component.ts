import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { CommercialAccountRegisterFieldsConfig } from './commercial-account-register-fields-config';
import { SubscriptionHandler } from '@skysmack/framework';
import { NgRedux } from '@angular-redux/store';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { OAuth2Requests } from '@skysmack/ng-oauth2';
import { CommercialAccountService } from '../../services/commercial-account.service';

@Component({
  selector: 'ss-commercial-account-register',
  templateUrl: './commercial-account-register.component.html',
  styleUrls: ['./commercial-account-register.component.scss'],
})
export class CommercialAccountRegisterComponent implements OnInit, OnDestroy {
  public fields$: Observable<Field[]>;
  private subscriptionHandler = new SubscriptionHandler();
  public removeCloseButton = false;
  public submitted: boolean;

  constructor(
    public router: Router,
    public fieldsConfig: CommercialAccountRegisterFieldsConfig,
    public ngRedux: NgRedux<any>,
    public requests: OAuth2Requests,
    public store: NgAuthenticationStore,
    public activatedRoute: ActivatedRoute,
    public service: CommercialAccountService
  ) { }

  ngOnInit() {
    this.fields$ = this.fieldsConfig.getFields(null, null);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.subscriptionHandler.register(this.service.register(fh.form.getRawValue()).pipe(
        tap(() => this.submitted = true)
      ).subscribe());
    }, false);
  }
}
