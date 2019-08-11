import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Field, FormHelper } from '@skysmack/ng-dynamic-forms';
import { CommercialAccountLoginFieldsConfig } from './commercial-account-login-fields-config';
import { trigger, transition, style, animate } from '@angular/animations';
import { SubscriptionHandler, IsAuthenticated } from '@skysmack/framework';
import { AuthenticationActions } from '@skysmack/redux';
import { CommercialAccountService } from '../../services';
import { NgRedux } from '@angular-redux/store';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { OAuth2Requests } from '@skysmack/ng-oauth2';

@Component({
  selector: 'ss-commercial-account-login',
  templateUrl: './commercial-account-login.component.html',
  styleUrls: ['./commercial-account-login.component.scss'],
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
export class CommercialAccountLoginComponent implements OnInit, OnDestroy {
  public loggingIn = false;
  public error = false;
  public success = false;
  public fields$: Observable<Field[]>;
  public subscriptionHandler = new SubscriptionHandler();
  public removeCloseButton = false;

  constructor(
    public router: Router,
    public fieldsConfig: CommercialAccountLoginFieldsConfig,
    public ngRedux: NgRedux<any>,
    public requests: OAuth2Requests,
    public store: NgAuthenticationStore,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated().pipe(
      filter(loggedIn => loggedIn === true),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.success = true;
          this.router.navigate(['/', 'account', 'dashboard']);
        }
      })
    ).subscribe());
    this.clearLoginErrors();
    this.fields$ = of(this.fieldsConfig.getFields());
    this.listenForErrors();
    this.subscriptionHandler.register(
      this.activatedRoute.parent.data.pipe(
        map(data => {
          if (data) {
            this.removeCloseButton = data.removeCloseButton;
          }
        })
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public onSubmit(fh: FormHelper) {

    fh.formValid(() => {
      this.login(fh.form.getRawValue());
    }, false);

    // // Clear error when user starts to type again
    this.subscriptionHandler.register(fh.form.valueChanges.subscribe(() => this.error = false));
  }

  private login(credentials: { email: string, password: string, staySignedIn: boolean }) {
    this.ngRedux.dispatch({ type: AuthenticationActions.CLEAR_LOGIN_ERROR });

    const packagePath = 'connect';

    this.subscriptionHandler.register(this.requests.login(credentials.email, credentials.password, credentials.staySignedIn, packagePath).subscribe(loginResultAction => this.ngRedux.dispatch(loginResultAction)));
    this.loggingIn = true;
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
