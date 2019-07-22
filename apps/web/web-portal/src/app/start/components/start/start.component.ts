import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { PackageRouteConfiguration } from '@skysmack/portal-ui';
import { SubscriptionHandler } from '@skysmack/framework';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

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
  public loadingRouteConfig: string[] = [];

  constructor(
    public router: Router,
    public store: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration
  ) {
  }

  ngOnInit() {
    this.subscriptionHandler.register(this.packageRouteConfiguration.configure().subscribe());
    this.skysmack$ = this.store.getSkysmack();
    this.skysmackLoaded$ = this.store.getSkysmackLoaded();
    this.router.onSameUrlNavigation = 'ignore';

    this.subscriptionHandler.register(this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        if (event.route.data && event.route.data.optional) {
        } else {
          this.loadingRouteConfig.push(event.route.path);
        }
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig.pop();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
