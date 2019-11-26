import { Component, OnInit } from '@angular/core';
import { SubscriptionHandler, HttpSuccessResponse } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { convertObservableToBehaviorSubject } from '@skysmack/ng-framework';
import { CommercialPackagesService } from '../../services';
import { map } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../../models/commercial-available-package';
import { DevelopmentState } from '../../models/development-state';

@Component({
  selector: 'ss-commercial-tenants-packages',
  templateUrl: './commercial-tenants-packages.component.html',
  styleUrls: ['./commercial-tenants-packages.component.scss']
})
export class CommercialTenantsPackagesComponent implements OnInit {
  private subscriptionHandler = new SubscriptionHandler();
  private availablePackages$: BehaviorSubject<CommercialAvailablePackage[]>;
  public selectedPackage: CommercialAvailablePackage;

  constructor(
    private packagesService: CommercialPackagesService
  ) { }

  ngOnInit() {
    this.availablePackages$ = convertObservableToBehaviorSubject(this.packagesService.getAvailablePackages().pipe(map((x: HttpSuccessResponse<CommercialAvailablePackage>) => x.body as CommercialAvailablePackage[])), []);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public getDependentPackages(packageType: string): CommercialAvailablePackage[] {
    if (!packageType || packageType.length === 0) {
      return this.availablePackages$.getValue().filter(_package => !_package.dependencyTypes || _package.dependencyTypes && _package.dependencyTypes.length === 0);
    } else {
      return this.availablePackages$.getValue().filter(_package => _package.dependencyTypes && _package.dependencyTypes.includes(packageType));
    }
  }

  public selectPackage(_package: CommercialAvailablePackage) {
    this.selectedPackage = _package;
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
