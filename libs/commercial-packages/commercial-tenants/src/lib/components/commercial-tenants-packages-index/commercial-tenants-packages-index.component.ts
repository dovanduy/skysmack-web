import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpSuccessResponse, linq, SubscriptionHandler } from '@skysmack/framework';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { CommercialPackagesService } from '../../services';
import { map, startWith, tap } from 'rxjs/operators';
import { CommercialAvailablePackage } from '../../models/commercial-available-package';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'ss-commercial-tenants-packages-index',
  templateUrl: './commercial-tenants-packages-index.component.html',
  styleUrls: ['./commercial-tenants-packages-index.component.scss']
})
export class CommercialTenantsPackagesIndexComponent implements OnInit, OnDestroy {
  public subscriptionHandler = new SubscriptionHandler();
  public availablePackages$: Observable<CommercialAvailablePackage[]>;
  public filteredAvailablePackages$: Observable<CommercialAvailablePackage[]>;
  public availablePackagesAutoCompleteControl = new FormControl();
  public categories$: Observable<string[]>;
  public selectedCategory$ = new BehaviorSubject<string>('');

  constructor(
    private packagesService: CommercialPackagesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setCategoryFromRoute();
    this.setPackages();
    this.setCategories();
    this.setFilteredPackages();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public setCategoryFromRoute(): void {
    this.subscriptionHandler.register(this.activatedRoute.params.pipe(
      tap(params => this.setCategory(params.category ? params.category : ''))
    ).subscribe());
  }

  public setPackages(): void {
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
  }

  public setCategories(): void {
    this.categories$ = this.availablePackages$.pipe(
      map(packages => linq(packages.map(_package => _package.category)).distinct().ok().sort())
    );
  }

  public setFilteredPackages(): void {
    this.filteredAvailablePackages$ = combineLatest(
      this.availablePackagesAutoCompleteControl.valueChanges.pipe(startWith('')),
      this.availablePackages$,
      this.selectedCategory$
    ).pipe(
      map(([searchInput, availablePackages, selectedCategory]) => {
        const categoryFiltedPackages = selectedCategory.length > 0 ? availablePackages.filter(_package => _package.category === selectedCategory) : availablePackages;
        return searchInput && searchInput.length > 0 ? this.filterAvailablePackages(searchInput, categoryFiltedPackages) : categoryFiltedPackages;
      })
    );
  }

  public selectedCategoryChanged(event: MatSelectChange) {
    this.setCategory(event.value);
  }

  public availablePackageDisplayFn(availablePackage: CommercialAvailablePackage): string {
    return availablePackage ? availablePackage && availablePackage.name : '';
  }

  private setCategory(category: string): void {
    if (category && category.length > 0) {
      const lowerCaseCategory = category.toLowerCase();
      const properFormatCategory = lowerCaseCategory[0].toUpperCase() +
        lowerCaseCategory.slice(1);
      this.selectedCategory$.next(properFormatCategory);
    } else {
      this.selectedCategory$.next('');
    }
  }

  private filterAvailablePackages(searchInput: string, availablePackage: CommercialAvailablePackage[]): CommercialAvailablePackage[] {
    if (typeof (searchInput) === 'string') {
      return availablePackage.map(availablePackage => ({ availablePackage, hit: availablePackage.name.toLowerCase().indexOf(searchInput.toLowerCase()) })).filter(availablePackageHit => availablePackageHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(availablePackageHit => availablePackageHit.availablePackage);
    }
    return availablePackage;
  }
}
