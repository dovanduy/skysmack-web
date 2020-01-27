import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { PackageRouteConfiguration } from '@skysmack/portal-ui';
import { SubscriptionHandler } from '@skysmack/framework';
import { Skysmack, SkysmackRequestStatus } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { tap, take, switchMap } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'skysmack-app',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartComponent implements OnInit, OnDestroy {

  private subscriptionHandler = new SubscriptionHandler();
  public skysmack$: Observable<Skysmack>;
  public skysmackLoaded$: Observable<SkysmackRequestStatus>;
  public loadingRouteConfig: string[] = [];

  constructor(
    public router: Router,
    public store: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration,
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate
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

    if (this.swUpdate.isEnabled) {
      this.subscriptionHandler.register(this.swUpdate.available.pipe(
        switchMap(() => {
          const message = "New version available! Please refresh to update.";
          const actionText = "Refresh now";
          const snackbarConfig = { politeness: 'assertive', duration: 10000, horizontalPosition: 'center', verticalPosition: 'top' } as MatSnackBarConfig;
          const snackBarRef = this.snackBar.open(message, actionText, snackbarConfig);
          return snackBarRef.onAction().pipe(take(1));
        }),
        take(1),
        tap(() => this.swUpdate.activateUpdate().then(() => document.location.reload()))
      ).subscribe());

      setTimeout(() => {
        this.swUpdate.checkForUpdate();
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
