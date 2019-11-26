import { Component, OnInit } from '@angular/core';
import { SubscriptionHandler, HttpSuccessResponse } from '@skysmack/framework';
import { BehaviorSubject } from 'rxjs';
import { convertObservableToBehaviorSubject } from '@skysmack/ng-framework';
import { CommercialPackagesService } from '../../services';
import { map } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../../models/commercial-available-package';
import { DevelopmentState } from '../../models';

@Component({
  selector: 'ss-commercial-tenants-packages',
  templateUrl: './commercial-tenants-packages.component.html',
  styleUrls: ['./commercial-tenants-packages.component.scss']
})
export class CommercialTenantsPackagesComponent implements OnInit {
  private subscriptionHandler = new SubscriptionHandler();
  private availablePackages$: BehaviorSubject<CommercialAvailablePackage[]>;
  public selectedPackages: CommercialAvailablePackage[] = [null];

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

  public clearPackageLists(index: number = 1): void {
    if (index >= 1) {
      this.selectedPackages = this.selectedPackages.slice(0, index);
    }
  }

  public selectPackage(packageType: string, index: number) {
    this.clearPackageLists(index + 1);
    const availablePackages = this.availablePackages$.getValue();
    // Do magic
    const match = availablePackages.find(_package => _package.type === packageType);
    this.selectedPackages = this.selectedPackages.concat([match]);
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
