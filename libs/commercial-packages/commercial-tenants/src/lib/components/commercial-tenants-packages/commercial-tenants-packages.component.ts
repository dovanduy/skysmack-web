import { Component, OnInit } from '@angular/core';
import { SubscriptionHandler, AvailablePackage, HttpSuccessResponse } from '@skysmack/framework';
import { of, BehaviorSubject } from 'rxjs';
import { convertObservableToBehaviorSubject } from '@skysmack/ng-framework';
import { CommercialPackagesService } from '../../services';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'ss-commercial-tenants-packages',
  templateUrl: './commercial-tenants-packages.component.html',
  styleUrls: ['./commercial-tenants-packages.component.scss']
})
export class CommercialTenantsPackagesComponent implements OnInit {
  private subscriptionHandler = new SubscriptionHandler();
  private availablePackages$: BehaviorSubject<AvailablePackage[]>;
  public selectedPackages: AvailablePackage[] = [null];

  constructor(
    private packagesService: CommercialPackagesService
  ) { }

  ngOnInit() {
    this.availablePackages$ = convertObservableToBehaviorSubject(this.packagesService.getAvailablePackages().pipe(map((x: HttpSuccessResponse) => x.body as AvailablePackage[])), []);
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public getDependentPackages(packageType: string): AvailablePackage[] {
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
}
