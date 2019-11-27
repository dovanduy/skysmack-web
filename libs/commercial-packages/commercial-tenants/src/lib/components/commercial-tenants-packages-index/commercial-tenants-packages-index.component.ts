import { Component, OnInit } from '@angular/core';
import { HttpSuccessResponse } from '@skysmack/framework';
import { Observable, combineLatest } from 'rxjs';
import { CommercialPackagesService } from '../../services';
import { map, startWith } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../../models/commercial-available-package';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ss-commercial-tenants-packages-index',
  templateUrl: './commercial-tenants-packages-index.component.html',
  styleUrls: ['./commercial-tenants-packages-index.component.scss']
})
export class CommercialTenantsPackagesIndexComponent implements OnInit {
  public availablePackages$: Observable<CommercialAvailablePackage[]>;
  public filteredAvailablePackages$: Observable<CommercialAvailablePackage[]>;
  public availablePackagesAutoCompleteControl = new FormControl();

  constructor(
    private packagesService: CommercialPackagesService,
    private router: Router
  ) { }

  ngOnInit() {
    const leastDepsFirst = (a, b) => {
      const aCount = a.dependencyTypes ? a.dependencyTypes.length : 0;
      const bCount = b.dependencyTypes ? b.dependencyTypes.length : 0;
      if (aCount === bCount) {
        return 0;
      } else {
        return aCount > bCount ? 1 : -1;
      };
    };

    this.availablePackages$ = this.packagesService.getAvailablePackages().pipe(
      map((x: HttpSuccessResponse<CommercialAvailablePackage>) => x.body as CommercialAvailablePackage[]),
      map(packages => packages.map(x => x).sort(leastDepsFirst)
      )
    );

    this.filteredAvailablePackages$ = combineLatest(
      this.availablePackagesAutoCompleteControl.valueChanges.pipe(startWith('')),
      this.availablePackages$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput && searchInput.length > 0 ? this.filterLodgings(searchInput, lodgingTypes) : lodgingTypes)
    );
  }

  public selectPackage(_package: CommercialAvailablePackage) {
    this.router.navigate(['/', 'tenants', 'packages', _package.category, _package.name])
  }

  public availablePackageDisplayFn(availablePackage: CommercialAvailablePackage): string {
    return availablePackage ? availablePackage && availablePackage.name : '';
  }

  private filterLodgings(searchInput: string, availablePackage: CommercialAvailablePackage[]): CommercialAvailablePackage[] {
    if (typeof (searchInput) === 'string') {
      return availablePackage.map(availablePackage => ({ availablePackage, hit: availablePackage.name.toLowerCase().indexOf(searchInput.toLowerCase()) })).filter(availablePackageHit => availablePackageHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(availablePackageHit => availablePackageHit.availablePackage);
    }
    return availablePackage;
  }
}
