import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, catchError, map } from 'rxjs/operators';
import { EntityComponentPageTitle } from 'lib/portal-ui/models/entity-component-page-title';
import { NgAuthenticationActions } from 'lib/ng-packages/authentication/redux/ng-authentication-actions';
import { NgAuthenticationStore } from 'lib/ng-packages/authentication/redux/ng-authentication-store';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack';
import { LoginFieldsConfig } from '../../login-fields-config';
import { FormHelper, Field } from 'lib/portal-ui';
import { NgSkysmackActions } from 'lib/ng-packages/skysmack/redux/ng-skysmack-actions';
import { SubscriptionHandler, ApiDomain, CurrentUser, HttpErrorResponse } from '@skysmack/framework';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OpenIdConnectResponse, AuthenticationActions } from '@skysmack/packages-authentication';
import { ReduxAction } from '@skysmack/redux';
import { of } from '@skysmack/packages-authentication/node_modules/rxjs';
import * as moment from 'moment';

@Component({
  selector: 'ss-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit, OnDestroy {
  public loggingIn = false;
  public error = false;
  public success = false;
  public fields: Field[];
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public componentPageTitle: EntityComponentPageTitle,
    public router: Router,
    public actions: NgAuthenticationActions,
    public store: NgAuthenticationStore,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public fieldsConfig: LoginFieldsConfig,
    protected http: HttpClient,
    @Inject('ApiDomain') protected apiDomain: ApiDomain
  ) {
  }

  ngOnInit() {
    this.componentPageTitle.setTitle('OPEN_IDDICT.OPEN_IDDICT_LOGIN.SIGN_IN', true, false);
    this.clearLoginErrors();
    this.createForm();
    this.listenForErrors();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public createForm() {
    this.fields = this.fieldsConfig.getStaticFields();
  }

  public onSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.login(fh.form.getRawValue());
    }, false);

    // Clear error when user starts to type again
    this.subscriptionHandler.register(fh.form.valueChanges.subscribe(() => this.error = false));
  }

  private login(credentials: { email: string, password: string }) {
    this.actions.clearLoginError();
    this.requestLogin(credentials.email, credentials.password);
    this.loggingIn = true;

    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated()
      .pipe(filter(loggedIn => loggedIn === true)).subscribe(() => {
        this.success = true;
        this.skysmackActions.getSkysmack();
        this.router.navigate(['/']);
      }));
  }

  private requestLogin(email: string, password: string): void {
    const url = `${this.apiDomain.domain}/oauth2/password`;
    const params = new HttpParams()
      .append('grant_type', 'password')
      .append('username', email)
      .append('password', password);

    this.subscriptionHandler.register(this.http.post<OpenIdConnectResponse>(url, params, { observe: 'response' })
      .pipe(
        map((response) => {
          return Object.assign({}, new ReduxAction<CurrentUser>({
            type: AuthenticationActions.LOG_IN_SUCCESS,
            payload: new CurrentUser({
              resource: response.body.resource,
              token_type: response.body.token_type,
              access_token: response.body.access_token,
              expires_in: response.body.expires_in,
              loginTime: new Date(moment().toString()),
              email: email
            })
          }));
        }),
        catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
          type: AuthenticationActions.LOG_IN_ERROR,
          payload: error,
          error: true
        }))))
      ).subscribe(loginResultAction => this.actions.store.dispatch(loginResultAction)));
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
    this.subscriptionHandler.register(this.skysmackStore.getHydrated().pipe(filter(x => x === true)).subscribe(() => this.actions.clearLoginError()));
  }
}
