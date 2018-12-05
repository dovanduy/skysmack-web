import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skysmack } from '@skysmack/packages-skysmack';
import { Router, ActivatedRoute } from '@angular/router';
import { PackageRouteConfiguration } from '../../../package-route-configuration';
import { NgSkysmackStore } from './../../../../../../../lib/ng-packages/skysmack/redux/ng-skysmack-store';

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
    public redux: NgSkysmackStore,
    public packageRouteConfiguration: PackageRouteConfiguration,
  ) {
    // super(router, activatedRoute, redux);
  }

  ngOnInit() {
    this.skysmack$ = this.redux.getSkysmack();
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
    this.skysmack$.subscribe((tenant) => {
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
