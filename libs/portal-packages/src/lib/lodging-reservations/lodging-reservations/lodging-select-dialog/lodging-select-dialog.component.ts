import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore, NgLodgingsActions, NgLodgingsStore, NgLodgingsAvailabilityActions, NgLodgingsAvailabilityStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject, RSQLFilterBuilder, SubscriptionHandler } from '@skysmack/framework';
import { LodgingType, DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable, combineLatest, of } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, switchMap, take, filter, startWith, tap, distinctUntilChanged } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

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
    private lodgingsAvailabilityActions: NgLodgingsAvailabilityActions,
    private lodgingsAvailabilityStore: NgLodgingsAvailabilityStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private lodgingTypesStore: NgLodgingTypesStore,
    private dialogRef: MatDialogRef<LodgingSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { form: FormGroup }
  ) { }

  ngOnInit() {
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

    // Set selected lodging type
    const preselectedLodgingTypeId = this.data.form.get('lodgingTypeId');
    if (preselectedLodgingTypeId && preselectedLodgingTypeId.value) {
      this.subscriptionHandler.register(lodgingPackage$.pipe(
        map(lodgingPackage => {
          this.subscriptionHandler.register(this.lodgingTypesStore.getSingle(lodgingPackage.object.path, preselectedLodgingTypeId.value).pipe(
            filter(x => !!x),
            map(
              lodgingType => {
                this.lodgingTypesAutoCompleteControl.setValue(lodgingType);
              }
            ),
            take(1)
          ).subscribe());
        }),        
        take(1)
      ).subscribe());
    }
    
    // Get all lodging types
    this.subscriptionHandler.register(lodgingPackage$.pipe(
      map(lodgingPackage => {
        this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
      })
    ).subscribe());

    // Get all lodging types
    const allLodgingTypes$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        return this.lodgingTypesStore.get(lodgingPackage.object.path);
      })
    );

    // Filter lodging types based on search input
    this.filteredLodgingTypes$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes)
    );

    // ########
    // Step 3: Preparing the lodgings auto complete
    // ########

    // Set selected lodging (if any)
    const preselectedLodgingId = this.data.form.get('lodgingId');
    if (preselectedLodgingId && preselectedLodgingId.value) {
      this.subscriptionHandler.register(lodgingPackage$.pipe(
        map(lodgingPackage => {
          this.subscriptionHandler.register(this.lodgingStore.getSingle(lodgingPackage.object.path, preselectedLodgingId.value).pipe(
            filter(x => !!x),
            map(lodgingType => {
              console.log('set lodging type');
              this.lodgingsAutoCompleteControl.setValue(lodgingType)
            }),
            take(1)
          ).subscribe())
        }
        )
      ).subscribe());
    }

    // If lodging type value changes, change the options in the select list
    this.subscriptionHandler.register(combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      lodgingPackage$
    ).pipe(
      filter(([selectedLodgingType, lodgingPackage]) => !!selectedLodgingType && selectedLodgingType.object),
      tap(x => console.log('pre switchMap')),
      map(([selectedLodgingType, lodgingPackage]) => {
        // Request lodgings
        const builder = new RSQLFilterBuilder();
        builder.column('lodgingTypeId').equalTo(selectedLodgingType.object.id);
        console.log('requesting lodgings');
        this.lodgingActions.getPaged(lodgingPackage.object.path, new PagedQuery({ rsqlFilter: builder }));
      })
    ).subscribe());

    // If lodging type value changes, change the options in the select list
    const allLodgingsOfType$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      lodgingPackage$
    ).pipe(
      filter(([selectedLodgingType, lodgingPackage]) => !!selectedLodgingType && selectedLodgingType.object),
      tap(x => console.log('pre switchMap')),
      switchMap(([selectedLodgingType, lodgingPackage]) => {
        // Get lodgings
        return this.lodgingStore.get(lodgingPackage.object.path).pipe(
          filter(x => !!x && Array.isArray(x)),
          map(lodgings => lodgings.filter(lodging => lodging.object.lodgingTypeId === selectedLodgingType.object.id)),
          filter(x => x.length > 0),
          tap(x => console.log('lodgings'))
        );
      })
    );

    // Filter lodgings based on search input
    const filteredLodgings$ = combineLatest(
      this.lodgingsAutoCompleteControl.valueChanges,
      allLodgingsOfType$
    ).pipe(
      tap(x => console.log('wtf 1')),
      map(([searchInput, lodgings]) => searchInput ? this.filterLodgings(searchInput, lodgings) : lodgings)
    );

    this.subscriptionHandler.register(combineLatest(
      lodgingPackage$,
      allLodgingsOfType$
    ).pipe(
      tap(x => console.log('wtf 2')),
      map(([lodgingPackage, lodgingsOfType]) => {
        const checkIn = this.data.form.get('checkIn').value;
        const checkOut = this.data.form.get('checkOut').value;
        const packagePath = lodgingPackage.object.path;
        this.lodgingsAvailabilityActions.getAvailableLodgings(packagePath, checkIn, checkOut, lodgingsOfType.map(lodging => lodging.objectIdentifier));
      })
    ).subscribe());

    // Get availability for all filtered lodgings
    const available$ = lodgingPackage$.pipe(
      switchMap((lodgingPackage) => {
        const checkIn = this.data.form.get('checkIn').value;
        const checkOut = this.data.form.get('checkOut').value;
        const packagePath = lodgingPackage.object.path;
        return this.lodgingsAvailabilityStore.getAvailableLodgings(packagePath, checkIn, checkOut).pipe(
          tap(x => console.log('available lodgings'))
        );
      })
    );

    // Create the detailed lodging used for selection and display
    this.detailedLodgings$ = combineLatest(
      filteredLodgings$,
      available$
    ).pipe(
      tap(x => console.log('wtf 3')),
      map(([lodgings, available]) => {
        return lodgings.map(lodging => {
          return new DetailedLodging({
            lodging,
            available: available[lodging.object.id] ? available[lodging.object.id] : false
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

  public cancel(): void {
    this.dialogRef.close();
  }

  public lodgingTypeDisplayFn(lodgingType: LocalObject<LodgingType, number>): string {
    return lodgingType ? lodgingType.object.name : '';
  }

  public lodgingDisplayFn(detailedLoging: DetailedLodging): string {
    return detailedLoging ? detailedLoging.lodging.object.name : '';
  }

  private filterLodgingTypes(searchInput: string, lodgingTypes: LocalObject<LodgingType, number>[]): LocalObject<LodgingType, number>[] {
    if (typeof (searchInput) === 'string') {
      return lodgingTypes.filter(lodgingType => lodgingType.object.name.toLowerCase().indexOf(searchInput.toLowerCase()) === 0);
    }
    return lodgingTypes;
  }

  private filterLodgings(searchInput: string, lodgings: LocalObject<Lodging, number>[]): LocalObject<Lodging, number>[] {
    if (typeof (searchInput) === 'string') {
      return lodgings.filter(lodging => lodging.object.name.toLowerCase().indexOf(searchInput.toLowerCase()) === 0);
    }
    return lodgings;
  }
}
