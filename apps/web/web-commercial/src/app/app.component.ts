import { Component, ViewEncapsulation, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AnalyticsService } from '@skysmack/ng-framework';

@Component({
  selector: 'skysmack-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;
  loadingRouteConfig: boolean;

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.analyticsService.init();
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }

  public onToggleSidenav = () => {
    this.sidenav.toggle();
  }

  public onSidenavClose = () => {
    this.sidenav.close();
  }
}
