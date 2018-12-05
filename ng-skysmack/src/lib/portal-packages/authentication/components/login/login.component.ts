import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EntityComponentPageTitle } from 'lib/portal-ui/models/entity-component-page-title';
import { NgAuthenticationActions } from 'lib/ng-packages/authentication/redux/ng-authentication-actions';
import { NgAuthenticationStore } from 'lib/ng-packages/authentication/redux/ng-authentication-store';
import { NgSkysmackStore } from 'lib/ng-packages/skysmack';
import { LoginFieldsConfig } from '../../login-fields-config';
import { FormHelper, Field } from 'lib/portal-ui';
import { NgSkysmackActions } from 'lib/ng-packages/skysmack/redux/ng-skysmack-actions';
import { SubscriptionHandler } from '@skysmack/framework';

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
export class LoginComponent implements OnInit {
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
  ) {
  }

  ngOnInit() {
    this.componentPageTitle.setTitle('OPEN_IDDICT.OPEN_IDDICT_LOGIN.SIGN_IN', true, false);
    this.clearLoginErrors();
    this.createForm();
    this.listenForErrors();
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
    this.actions.login(credentials);
    this.loggingIn = true;
    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated()
      .pipe(filter(loggedIn => loggedIn === true)).subscribe(() => {
        this.success = true;
        // Load initial needed values
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
    this.subscriptionHandler.register(this.skysmackStore.getHydrated().pipe(filter(x => x === true)).subscribe(() => this.actions.clearLoginError()));
  }
}
