import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentTenantViewModel } from '@skysmack/packages-skysmack';
import { Router } from '@angular/router';
import { NgSkysmackRedux } from 'lib/ng-packages/skysmack/redux/ng-skysmack-redux';
import { PackageRouteConfiguration } from '../../../package-route-configuration';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'start-root',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public currentTenant$: Observable<CurrentTenantViewModel>;
  public currentTenantLoaded$: Observable<boolean>;

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
  }
}
