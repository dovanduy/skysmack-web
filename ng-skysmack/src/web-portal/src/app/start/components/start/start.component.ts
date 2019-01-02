import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { PackageRouteConfiguration } from '../../../package-route-configuration';
import { SubscriptionHandler } from '@skysmack/framework';
import { Skysmack } from '@skysmack/packages-skysmack-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'skysmack-app',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartComponent implements OnInit, OnDestroy {

  public subscriptionHandler = new SubscriptionHandler();
  public skysmack$: Observable<Skysmack>;
  public skysmackLoaded$: Observable<boolean>;
  public loadingRouteConfig: boolean;

  constructor(
    public router: Router,
    public store: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration,
  ) { }

  ngOnInit() {
    this.packageRouteConfiguration.configure();
    this.skysmack$ = this.store.getSkysmack();
    this.skysmackLoaded$ = this.store.getSkysmackLoaded();
    this.router.onSameUrlNavigation = 'ignore';

    this.subscriptionHandler.register(this.router.events.subscribe(event => {
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
