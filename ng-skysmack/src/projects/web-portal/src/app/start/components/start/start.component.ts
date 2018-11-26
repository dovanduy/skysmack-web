import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgSkysmackRedux } from './../../../../../../../lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { PackageRouteConfiguration } from '../../../package-route-configuration';
import { SubscriptionHandler } from '@skysmack/framework';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'skysmack-app',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartComponent implements OnInit, OnDestroy {

  public subscriptionHandler = new SubscriptionHandler();
  public currentTenant$: Observable<CurrentTenantViewModel>;
  public currentTenantLoaded$: Observable<boolean>;
  public loadingRouteConfig: boolean;

  constructor(
    public router: Router,
    public redux: NgSkysmackRedux,
    public packageRouteConfiguration: PackageRouteConfiguration,
  ) { }

  ngOnInit() {
    this.packageRouteConfiguration.configure();
    this.currentTenant$ = this.redux.getCurrentTenant();
    this.currentTenantLoaded$ = this.redux.getCurrentTenantLoaded();
    this.router.onSameUrlNavigation = 'ignore';

    this.subscriptionHandler.subscribe(this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
