import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AllowAccessFor } from '@skysmack/framework';
import { TranslationRedux } from '@skysmack/ng-translation';
import { SubscriptionHandler } from '@skysmack/framework';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Component({
  selector: 'skysmack-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  
  public subscriptionHandler = new SubscriptionHandler();
  
  @ViewChild(MatSidenav, { static: false }) public sidenav: MatSidenav;
  public loadingRouteConfig: boolean;
  public allowAccessForEnum = AllowAccessFor;

  constructor(
    private router: Router,
    public translationRedux: TranslationRedux,    
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    this.translationRedux.setLanguage('da');
    this.subscriptionHandler.register(this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    }));    

    if (this.swUpdate.isEnabled) {
      this.subscriptionHandler.register(this.swUpdate.available.subscribe(() => {
        const snackBarRef = this.snackBar.open("New version available! Please refresh to update.", 
          "Refresh now", 
          { politeness: 'assertive', duration: 10000, horizontalPosition: 'center', verticalPosition: 'top' } as MatSnackBarConfig);
          this.subscriptionHandler.register(snackBarRef.onAction().pipe(take(1)).subscribe(() => {
            window.location.reload();
          }));
      }));
      setInterval( () => {
        this.swUpdate.checkForUpdate();
      }, 1000);
    } 
  }

  public onToggleSidenav = () => {
    this.sidenav.toggle();
  }

  public onSidenavClose = () => {
    this.sidenav.close();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }
}
