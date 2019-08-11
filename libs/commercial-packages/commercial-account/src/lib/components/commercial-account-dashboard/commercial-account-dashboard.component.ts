import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgAuthenticationStore, NgAuthenticationActions } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { CurrentUser, SubscriptionHandler } from '@skysmack/framework';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-account-dashboard',
  templateUrl: './commercial-account-dashboard.component.html',
  styleUrls: ['./commercial-account-dashboard.component.scss']
})
export class CommercialAccountDashboardComponent implements OnInit, OnDestroy {
  public currentUser$: Observable<CurrentUser>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public store: NgAuthenticationStore,
    public actions: NgAuthenticationActions,
    public router: Router
  ) { }

  ngOnInit() {
    this.currentUser$ = this.store.getCurrentUser();
    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated().pipe(
      filter(loggedIn => !loggedIn),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/', 'account', 'login']);
        }
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  logout() {
    console.log('log out...');
    this.actions.logout();
  }
}
