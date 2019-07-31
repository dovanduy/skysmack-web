import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { CommercialLoginFieldsConfig } from './commercial-login-fields-config';
import { trigger, transition, style, animate } from '@angular/animations';
import { SubscriptionHandler } from '@skysmack/framework';
import { AuthenticationActions } from '@skysmack/redux';
import { CommercialAccountService } from '../../services';
import { NgRedux } from '@angular-redux/store';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-login',
  templateUrl: './commercial-login.component.html',
  styleUrls: ['./commercial-login.component.scss'],
  animations: [
    trigger(
      'shrinkOut',
      [
        transition(
          ':enter', [
            style({ height: 0, opacity: 0.5 }),
            animate('.1s', style({ height: '*', 'opacity': 1 }))
          ]
        ),
        transition(
          ':leave', [
            style({ height: '*', 'opacity': 1 }),
            animate('.1s', style({ height: 0, 'opacity': 0 }))
          ]
        )]
    )
  ]
})
export class CommercialLoginComponent implements OnInit {
  public removeCloseButton = true;
  public loggingIn = false;
  public error = false;
  public success = false;
  public fields$: Observable<Field[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public router: Router,
    public fieldsConfig: CommercialLoginFieldsConfig,
    public ngRedux: NgRedux<any>,
    public requests: CommercialAccountService,
    public store: NgAuthenticationStore
  ) { }

  ngOnInit() {
    this.clearLoginErrors();
    this.fields$ = of(this.fieldsConfig.getFields());
    this.listenForErrors();
  }

  public onSubmit(fh: FormHelper) {
    // TODO: TEMP!!! REMOVE WHEN LOGIN WORKS
    this.router.navigate(['account', 'dashboard']);

    // fh.formValid(() => {
    //   this.login(fh.form.getRawValue());
    // }, false);

    // // Clear error when user starts to type again
    // this.subscriptionHandler.register(fh.form.valueChanges.subscribe(() => this.error = false));
  }

  private login(credentials: { email: string, password: string }) {
    this.ngRedux.dispatch({ type: AuthenticationActions.CLEAR_LOGIN_ERROR });

    this.subscriptionHandler.register(this.requests.login(credentials.email, credentials.password).subscribe(loginResultAction => this.ngRedux.dispatch(loginResultAction)));
    this.loggingIn = true;

    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated()
      .pipe(filter(loggedIn => loggedIn === true)).subscribe(() => {
        this.success = true;
        this.router.navigate(['account', 'dashboard']);
      }));
  }

  private listenForErrors() {
    this.subscriptionHandler.register(this.store.getLoginError().subscribe(error => {
      if (error) {
        this.loggingIn = false;
        this.error = true;
      } else {
        this.error = false;
      }
    }));
  }

  private clearLoginErrors() {
    this.subscriptionHandler.register(this.ngRedux.select((state: any) => state.hydrated.hydrated).pipe(filter(x => x === true)).subscribe(() => this.ngRedux.dispatch({ type: AuthenticationActions.CLEAR_LOGIN_ERROR })));
  }
}
