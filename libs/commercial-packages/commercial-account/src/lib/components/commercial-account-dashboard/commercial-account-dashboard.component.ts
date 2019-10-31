import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgAuthenticationStore } from '@skysmack/ng-framework';
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
  private subscriptionHandler = new SubscriptionHandler();

  constructor(
    public store: NgAuthenticationStore,
    public router: Router
  ) { }

  ngOnInit() {
    this.currentUser$ = this.store.getCurrentUser();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
