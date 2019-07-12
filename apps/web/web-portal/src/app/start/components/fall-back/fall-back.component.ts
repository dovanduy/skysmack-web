import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { PackageRouteConfiguration } from '@skysmack/portal-ui';
import { take } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Component({
  selector: 'ss-fall-back',
  templateUrl: './fall-back.component.html'
})
export class FallBackComponent implements OnInit {
  public skysmack$: Observable<Skysmack>;
  public packagesLoaded = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration
  ) {
  }

  ngOnInit() {
    this.skysmack$ = this.store.getSkysmack();
    this.checkForTenantLoaded();
  }

  private checkForTenantLoaded() {
    this.skysmack$.pipe(take(1)).subscribe((tenant) => {
      if (tenant != null && tenant.name.length > 0) {
        if (this.router.onSameUrlNavigation !== 'reload') {
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        } else {
          this.router.onSameUrlNavigation = 'ignore';
        }
        this.packagesLoaded = true;
      }
    });
  }
}
