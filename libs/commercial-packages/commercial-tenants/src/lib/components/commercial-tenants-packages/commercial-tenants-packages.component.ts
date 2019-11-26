import { Component, OnInit } from '@angular/core';
import { SubscriptionHandler, HttpSuccessResponse } from '@skysmack/framework';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { convertObservableToBehaviorSubject } from '@skysmack/ng-framework';
import { CommercialPackagesService } from '../../services';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../../models/commercial-available-package';
import { DevelopmentState } from '../../models/development-state';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ss-commercial-tenants-packages',
  templateUrl: './commercial-tenants-packages.component.html',
  styleUrls: ['./commercial-tenants-packages.component.scss']
})
export class CommercialTenantsPackagesComponent implements OnInit {
  private subscriptionHandler = new SubscriptionHandler();
  private availablePackages$: BehaviorSubject<CommercialAvailablePackage[]>;
  public selectedPackage: CommercialAvailablePackage;
  public couldNotFindPackage: boolean;

  constructor(
    private packagesService: CommercialPackagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.availablePackages$ = convertObservableToBehaviorSubject(this.packagesService.getAvailablePackages().pipe(map((x: HttpSuccessResponse<CommercialAvailablePackage>) => x.body as CommercialAvailablePackage[])), []);

    const updatePackage$ = combineLatest([
      this.activatedRoute.params,
      this.availablePackages$
    ]).pipe(
      tap(([params, availablePackages]) => {
        this.selectedPackage = availablePackages.find(_package => _package.name === params.name && _package.category === params.category);
        this.selectedPackage ? this.couldNotFindPackage = false : this.couldNotFindPackage = true;
      })
    );

    // Initial navigation
    this.subscriptionHandler.register(updatePackage$.subscribe());

    // Subsequent navigation
    this.subscriptionHandler.register(this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      switchMap(() => updatePackage$),
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public getDependentPackages(packageType: string): CommercialAvailablePackage[] {
    return this.availablePackages$.getValue().filter(_package => _package.dependencyTypes && _package.dependencyTypes.includes(packageType));
  }

  public getDevelopmentState(state: number): string {
    switch (state) {
      case DevelopmentState.Alpha:
        return 'Alpha';
      case DevelopmentState.Beta:
        return 'Beta';
      case DevelopmentState.Obsolete:
        return 'Obsolete';
      case DevelopmentState.Stable:
        return 'Stable';
      default:
        return '';
    }
  }
}
