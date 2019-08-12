import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgAuthenticationStore, NgAuthenticationActions } from '@skysmack/ng-framework';
import { SubscriptionHandler } from '@skysmack/framework';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-ui-partners-wrapper',
  templateUrl: './commercial-ui-partners-wrapper.component.html',
  styleUrls: ['./commercial-ui-partners-wrapper.component.scss']
})
export class CommercialUiPartnersWrapperComponent implements OnInit, OnDestroy {

  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    public store: NgAuthenticationStore,
    public actions: NgAuthenticationActions,
    public router: Router
  ) { }

  ngOnInit() {
    this.subscriptionHandler.register(this.store.isCurrentUserAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) {
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
