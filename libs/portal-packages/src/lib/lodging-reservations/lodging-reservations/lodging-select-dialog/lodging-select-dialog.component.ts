import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore, NgLodgingsActions, NgLodgingsStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject, RSQLFilterBuilder, SubscriptionHandler } from '@skysmack/framework';
import { LodgingType, DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable, combineLatest, BehaviorSubject, concat } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, switchMap, take, filter, tap, debounceTime, distinctUntilChanged, startWith, share } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'ss-lodging-select-dialog',
  templateUrl: './lodging-select-dialog.component.html'
})
export class LodgingSelectDialogComponent implements OnInit, OnDestroy {
  public lodgingTypesAutoCompleteControl = new FormControl();
  public filteredLodgingTypes$: Observable<LocalObject<LodgingType, number>[]>;

  public lodgingsAutoCompleteControl = new FormControl();
  private selectedLodging: DetailedLodging;
  public detailedLodgings$: Observable<DetailedLodging[]>;
  public subscriptionHandler = new SubscriptionHandler();

  constructor(
    private router: Router,
    private skysmackStore: NgSkysmackStore,
    private lodgingActions: NgLodgingsActions,
    private lodgingStore: NgLodgingsStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private lodgingTypesStore: NgLodgingTypesStore,
    private dialogRef: MatDialogRef<LodgingSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { from: any, to: any, lodgingTypeId: number, lodgingId: number }
  ) { }

  ngOnInit() {
    if (this.data.from instanceof Date) {
      this.data.from = this.data.from.toISOString();
    }
    if (this.data.to instanceof Date) {
      this.data.to = this.data.to.toISOString();
    }

    // ########
    // Step 1: Setting defaults
    // ########

    // Prepare related lodging package
    const packagePath = this.router.url.split('/')[1];
    const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
      filter(x => !!x),
      take(1)
    );

    // ########
    // Step 2: Preparing the lodging types auto complete
    // ########

    // Init data for lodging types select box
    this.subscriptionHandler.register(lodgingPackage$.pipe(
      tap(lodgingPackage => {
        this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
      }),
      take(1)
    ).subscribe());

    // Prepare lodging type search and selection streams
    const lodgingTypesSearch$ = this.lodgingTypesAutoCompleteControl.valueChanges;

    const lodgingTypeSearchInput$ = lodgingTypesSearch$.pipe(
      filter(searchInput => searchInput && !searchInput.object),
    );

    const initialSelectedLodgingType$ = new BehaviorSubject<LocalObject<LodgingType, number>>(null);

    const lodgingTypeSelected$ = concat(
      initialSelectedLodgingType$.pipe(filter(x => !!x), take(1)),
      lodgingTypesSearch$
    ).pipe(
      filter(selectedLodgingType => !!selectedLodgingType && selectedLodgingType.object),
    );

    // Set selected lodging type ON startup
    if (this.data.lodgingTypeId && this.data.lodgingTypeId > 0) {
      this.subscriptionHandler.register(lodgingPackage$.pipe(
        switchMap(lodgingPackage => {
          return this.lodgingTypesStore.getSingle(lodgingPackage.object.path, this.data.lodgingTypeId).pipe(
            filter(x => !!x),
            take(1),
            tap(lodgingType => {
              this.lodgingTypesAutoCompleteControl.setValue(lodgingType)
              initialSelectedLodgingType$.next(lodgingType)
            })
          );
        })
      ).subscribe());
    }

    // Request all lodging types ON startup
    this.subscriptionHandler.register(lodgingTypeSearchInput$.pipe(
      debounceTime(150),
      switchMap(searchInput => lodgingPackage$.pipe(
        map(lodgingPackage => {
          const rsql = new RSQLFilterBuilder();
          rsql.column('name').contains(searchInput);
          const pageQuery = new PagedQuery();
          pageQuery.rsqlFilter = rsql;

          return this.lodgingTypesActions.getPaged(lodgingPackage.object.path, pageQuery);
        })
      ))
    ).subscribe());

    // Get all lodging types
    // TODO: Pagination
    const allLodgingTypes$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => this.lodgingTypesStore.get(lodgingPackage.object.path)),
    );

    // Filter lodging types based ON search input
    // this.filteredLodgingTypes$ = combineLatest(
    //   allLodgingTypes$,
    //   lodgingTypeSearchInput$
    // ).pipe(
    //   debounceTime(25),
    //   map(([allLodgingTypes, lodgingTypeSearchInput]) => {

    //     return lodgingTypeSearchInput ? this.filterLodgingTypes(lodgingTypeSearchInput, allLodgingTypes) : allLodgingTypes);
    //   })
    // );

    this.filteredLodgingTypes$ = combineLatest(
      lodgingTypeSearchInput$,
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput && searchInput.length > 0 ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes)
    );

    // ########
    // Step 3: Preparing the lodgings auto complete
    // ########

    const lodgingsSearchInput$ = this.lodgingsAutoCompleteControl.valueChanges.pipe(
      startWith('')
    );

    // Set selected lodging (if any) ON startup
    if (this.data.lodgingId && this.data.lodgingId > 0) {
      this.subscriptionHandler.register(lodgingPackage$.pipe(
        switchMap(lodgingPackage => this.lodgingStore.getSingle(lodgingPackage.object.path, this.data.lodgingId).pipe(
          filter(x => !!x),
          tap(lodging => {
            this.lodgingsAutoCompleteControl.setValue(lodging);
            console.log('init value', lodging.object.id);
          }),
          take(1)
        ))
      ).subscribe());
    }

    // Request lodgings ON selecting lodging type
    this.subscriptionHandler.register(lodgingTypeSelected$.pipe(
      switchMap(selectedLodgingType => lodgingPackage$.pipe(
        map(lodgingPackage => {
          const builder = new RSQLFilterBuilder();
          builder.column('lodgingTypeId').equalTo(selectedLodgingType.object.id);
          this.lodgingActions.getPaged(lodgingPackage.object.path, new PagedQuery({ rsqlFilter: builder }));
        })
      ))
    ).subscribe());

    // Get lodgings ON selecting lodging type
    const allLodgingsOfType$ = lodgingTypeSelected$.pipe(
      switchMap(selectedLodgingType => lodgingPackage$.pipe(
        switchMap(lodgingPackage => this.lodgingStore.get(lodgingPackage.object.path).pipe(
          distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
          debounceTime(50),
          map(lodgings => lodgings.filter(lodging => lodging.object.lodgingTypeId === selectedLodgingType.object.id)),
          tap(lodgingsOfType => this.lodgingActions.getAvailableLodgings(lodgingPackage.object.path, this.data.from, this.data.to, lodgingsOfType.map(lodging => lodging.objectIdentifier)))
        ))
      ))
    );

    // Filter lodgings based ON lodging type select OR lodgings search input
    const filteredLodgings$ = combineLatest(
      lodgingsSearchInput$,
      allLodgingsOfType$
    ).pipe(
      map(([searchInput, lodgings]) => searchInput ? this.filterLodgings(searchInput, lodgings) : lodgings),
    );

    // Get lodging availability ON lodgings search
    const available$ = lodgingPackage$.pipe(
      switchMap((lodgingPackage) => this.lodgingStore.getAvailableLodgings(lodgingPackage.object.path, this.data.from, this.data.to))
    );

    // Create detailed lodgings (used for selection and display) when lodgings OR availability is updated
    this.detailedLodgings$ = combineLatest(
      filteredLodgings$,
      available$
    ).pipe(
      map(([lodgings, available]) => {
        console.log('returning lodgings');
        return lodgings.map(lodging => {
          return new DetailedLodging({
            lodging,
            available: available && available[lodging.object.id] ? available[lodging.object.id] : false
          })
        }).sort((a, b) => (a.available === b.available) ? 0 : a.available ? -1 : 1)
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public done(): void {
    this.dialogRef.close(this.selectedLodging);
  }

  public deselect(): void {
    this.dialogRef.close('null');
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public selectLodging(event: MatAutocompleteSelectedEvent): void {
    this.selectedLodging = event.option.value;
  }

  public lodgingTypeDisplayFn(lodgingType: LocalObject<LodgingType, number>): string {
    return lodgingType ? lodgingType.object && lodgingType.object.name : '';
  }

  public lodgingDisplayFn(detailedLoging: DetailedLodging): string {
    return detailedLoging ?
      detailedLoging.lodging
      && detailedLoging.lodging.object
      && detailedLoging.lodging.object.name : '';
  }

  private filterLodgingTypes(searchInput: string, lodgingTypes: LocalObject<LodgingType, number>[]): LocalObject<LodgingType, number>[] {
    if (typeof (searchInput) === 'string') {
      return lodgingTypes.map(lodgingType => ({ lodgingType, hit: lodgingType.object.name.toLowerCase().indexOf(searchInput.toLowerCase()) })).filter(lodgingTypeHit => lodgingTypeHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(lodgingTypeHit => lodgingTypeHit.lodgingType);
    }
    return lodgingTypes;
  }

  private filterLodgings(searchInput: string, lodgings: LocalObject<Lodging, number>[]): LocalObject<Lodging, number>[] {
    if (typeof (searchInput) === 'string') {
      return lodgings.map(lodging => ({ lodging, hit: lodging.object.name.toLowerCase().indexOf(searchInput.toLowerCase()) })).filter(lodgingHit => lodgingHit.hit >= 0).sort((a, b) => a.hit - b.hit).map(lodgingHit => lodgingHit.lodging);
    }
    return lodgings;
  }
}
