import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgSkysmackRedux } from './../../../../../../../lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { PackageRouteConfiguration } from '../../../package-route-configuration';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'skysmack-app',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartComponent implements OnInit {

  public currentTenant$: Observable<CurrentTenantViewModel>;
  public currentTenantLoaded$: Observable<boolean>;
  loadingRouteConfig: boolean;

  constructor(
    public router: Router,
    public redux: NgSkysmackRedux,
    public packageRouteConfiguration: PackageRouteConfiguration,
  ) { }

  ngOnInit() {
    // TODO: ADD subscriptionHandler to below code.
    this.packageRouteConfiguration.configure();
    this.currentTenant$ = this.redux.getCurrentTenant();
    this.currentTenantLoaded$ = this.redux.getCurrentTenantLoaded();
    // super.ngOnInit();
    this.router.onSameUrlNavigation = 'ignore';

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }

}
