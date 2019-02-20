import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Skysmack } from '@skysmack/packages-skysmack-core';
import { NgSkysmackStore, PackageRouteConfiguration } from '@skysmack/ng-packages';
import { take } from 'rxjs/operators';

// export class FallBackComponent extends EntityBase implements OnInit {

@Component({
  selector: 'ss-fall-back',
  templateUrl: './fall-back.component.html',
  styleUrls: ['./fall-back.component.scss']
})
export class FallBackComponent implements OnInit {
  public skysmack$: Observable<Skysmack>;
  public packagesLoaded = false;

  constructor(
    // public componentPageTitle: EntityComponentPageTitle,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public store: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration
  ) {
    // super(router, activatedRoute, store);
  }

  ngOnInit() {
    this.skysmack$ = this.store.getSkysmack();
    // this.componentPageTitle.setTitle('Not found');
    // super.ngOnInit();
    this.checkForTenantLoaded();
  }

  private checkForTenantLoaded() {
    // TODO: Uncomment this when entity base is implemented
    // this.subscriptionHandler.subscribe(this.packageRouteConfiguration.configure());
    // this.subscriptionHandler.subscribe(this.skysmack$.subscribe((tenant) => {
    //   if (tenant != null && tenant.name.length > 0) {
    //     if (this.router.onSameUrlNavigation !== 'reload') {
    //       this.router.onSameUrlNavigation = 'reload';
    //       this.router.navigate([this.router.url]);
    //     } else {
    //       this.router.onSameUrlNavigation = 'ignore';
    //     }
    //     this.componentPageTitle.setTitle('Not found');
    //     this.packagesLoaded = true;
    //   }
    // }));

    // TODO: Remove this when entity base is implemented
    this.skysmack$.pipe(take(1)).subscribe((tenant) => {
      if (tenant != null && tenant.name.length > 0) {
        if (this.router.onSameUrlNavigation !== 'reload') {
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        } else {
          this.router.onSameUrlNavigation = 'ignore';
        }
        // this.componentPageTitle.setTitle('Not found');
        this.packagesLoaded = true;
      }
    });
  }
}
