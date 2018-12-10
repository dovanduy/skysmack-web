import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EntityComponentPageTitle } from 'lib/portal-ui/models/entity-component-page-title';
import { NgOauth2Store } from 'lib/ng-packages/oauth2/redux/ng-oauth2-store';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack';
import { LoginFieldsConfig } from '../../login-fields-config';
import { FormHelper, Field } from 'lib/portal-ui';
import { NgSkysmackActions } from 'lib/ng-packages/skysmack/redux/ng-skysmack-actions';
import { SubscriptionHandler } from '@skysmack/framework';
import { AuthenticationActions } from '@skysmack/redux';
import { filter } from 'rxjs/operators';
import { Oauth2Requests } from 'lib/ng-packages/oauth2';

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
    public store: NgOauth2Store,
    public skysmackStore: NgSkysmackStore,
    public skysmackActions: NgSkysmackActions,
    public fieldsConfig: LoginFieldsConfig,
    public requests: Oauth2Requests
  ) { }

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
    this.store.store.dispatch({ type: AuthenticationActions.CLEAR_LOGIN_ERROR });
    const authPath = this.router.url.split('/')[1];
    this.subscriptionHandler.register(this.requests.login(credentials.email, credentials.password, authPath).subscribe(loginResultAction => this.store.store.dispatch(loginResultAction)));
    this.loggingIn = true;

    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated()
      .pipe(filter(loggedIn => loggedIn === true)).subscribe(() => {
        this.success = true;
        this.skysmackActions.getSkysmack();
        this.router.navigate(['/']);
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
    this.subscriptionHandler.register(this.skysmackStore.getHydrated().pipe(filter(x => x === true)).subscribe(() => this.store.store.dispatch({ type: AuthenticationActions.CLEAR_LOGIN_ERROR })));
  }
}
