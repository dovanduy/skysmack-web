import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AllowAccessFor } from '@skysmack/framework';
import { TranslationRedux } from '@skysmack/ng-translation';

@Component({
  selector: 'skysmack-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;
  public loadingRouteConfig: boolean;
  public allowAccessForEnum = AllowAccessFor;

  constructor(
    private router: Router,
    public translationRedux: TranslationRedux,
  ) { }

  ngOnInit() {
    this.translationRedux.setLanguage('da');
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
