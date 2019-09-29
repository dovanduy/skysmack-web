import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PackageRouteConfiguration } from '@skysmack/portal-ui';
import { filter, map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Component({
  selector: 'ss-fall-back',
  templateUrl: './fall-back.component.html'
})
export class FallBackComponent implements OnInit {
  public packageNotFound$: Observable<boolean>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration
  ) {
  }

  ngOnInit() {
    // TODO: This can cause and infinite loop. 
    // If a package exists but an Angular module doesn't, it will redirect forever. 
    // Solution could be either of these: 
    // a) Check the package in registered modules, routes or similar, to ensure it exists in the Angular project and not only in the tenant.
    // b) Set a static bool property, if last component was the FallBack component, and reset this as soon another component are visited. 
    this.packageNotFound$ = this.store.getSkysmack().pipe(
      filter(tenant => tenant && tenant.packages && tenant.packages.length > 0),
      map((tenant) => {
        const packagePath = this.router.url.split('/')[1].toLowerCase();
        if (tenant.packages.map(p => p.path.toLowerCase()).indexOf(packagePath) === -1) {
          // Package not found
          return true;
        }
        // Package was found, we shouldn't be here so let's do some magic redirect.
        // Timeout is to ensure routes are configured 
        setTimeout(() => {
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl(this.router.url, { skipLocationChange: true });
          this.router.onSameUrlNavigation = 'ignore';
        }, 50);
        return false;
      }));
  }
}
