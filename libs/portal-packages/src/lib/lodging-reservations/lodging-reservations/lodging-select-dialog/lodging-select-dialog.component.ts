import { Component, OnInit, Inject } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore, NgLodgingsActions, NgLodgingsStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject, RSQLFilterBuilder } from '@skysmack/framework';
import { LodgingType, DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable, combineLatest } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, switchMap, take, filter, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ss-lodging-select-dialog',
  templateUrl: './lodging-select-dialog.component.html'
})
export class LodgingSelectDialogComponent implements OnInit {
  public lodgingTypesAutoCompleteControl = new FormControl();
  public filteredLodgingTypes$: Observable<LocalObject<LodgingType, number>[]>;

  public lodgingsAutoCompleteControl = new FormControl();
  private selectedLodging: DetailedLodging;
  public detailedLodgings$: Observable<DetailedLodging[]>;

  constructor(
    private router: Router,
    private skysmackStore: NgSkysmackStore,
    private lodgingActions: NgLodgingsActions,
    private lodgingStore: NgLodgingsStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private lodgingTypesStore: NgLodgingTypesStore,
    private dialogRef: MatDialogRef<LodgingSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { form: FormGroup }
  ) { }

  ngOnInit() {
    // Prepare related lodging package
    const packagePath = this.router.url.split('/')[1];
    const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
      filter(x => !!x),
      take(1)
    );

    // Set selected lodging type
    const preselectedLodgingTypeId = this.data.form.get('lodgingTypeId');
    if (preselectedLodgingTypeId && preselectedLodgingTypeId.value) {
      lodgingPackage$.pipe(
        switchMap(lodgingPackage => {
          return this.lodgingTypesStore.getSingle(lodgingPackage.object.path, preselectedLodgingTypeId.value);
        }
        ),
        filter(x => !!x),
        map(
          lodgingType => {
            this.lodgingTypesAutoCompleteControl.setValue(lodgingType);
          }
        ),
        take(1)
      ).subscribe();
    }

    // Set selected lodging (if any)
    const preselectedLodgingId = this.data.form.get('lodgingId');
    if (preselectedLodgingId && preselectedLodgingId.value) {
      lodgingPackage$.pipe(
        switchMap(lodgingPackage => {
          return this.lodgingStore.getSingle(lodgingPackage.object.path, preselectedLodgingId.value);
        }
        ),
        filter(x => !!x),
        map(
          lodgingType => {
            this.lodgingsAutoCompleteControl.setValue(lodgingType);
          }
        ),
        take(1)
      ).subscribe();
    }

    // If lodging type value changes, change the options in the select list
    const allLodgingsOfType$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      lodgingPackage$
    ).pipe(
      filter(([selectedLodgingType, lodgingPackage]) => !!selectedLodgingType && selectedLodgingType.object && !!lodgingPackage),
      switchMap(([selectedLodgingType, lodgingPackage]) => {
        // Request lodgings
        const builder = new RSQLFilterBuilder();
        builder.column('lodgingTypeId').equalTo(selectedLodgingType.object.id);
        this.lodgingActions.getPaged(lodgingPackage.object.path, new PagedQuery({ rsqlFilter: builder }));

        // Get lodgings
        return this.lodgingStore.get(lodgingPackage.object.path).pipe(
          filter(x => !!x && Array.isArray(x)),
          map(lodgings => lodgings.filter(lodging => lodging.object.lodgingTypeId === selectedLodgingType.object.id)),
          filter(x => x.length > 0), take(1));
      })
    );

    // Get all lodging types
    const allLodgingTypes$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
        return this.lodgingTypesStore.get(lodgingPackage.object.path).pipe(filter(x => !!x), take(1));
      })
    );

    // Filter lodging types based on search input
    this.filteredLodgingTypes$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes.slice())
    );

    // Filter lodgings based on search input
    const filteredLodgings$ = combineLatest(
      this.lodgingsAutoCompleteControl.valueChanges.pipe(startWith('')),
      allLodgingsOfType$
    ).pipe(
      map(([searchInput, lodgings]) => searchInput ? this.filterLodgings(searchInput, lodgings) : lodgings.slice())
    );

    // Get availability for all filtered lodgings
    const available$ = combineLatest(
      lodgingPackage$,
      allLodgingsOfType$ // Take prevents loop
    ).pipe(
      switchMap(([lodgingPackage, lodgingsOfType]) => {
        const checkIn = this.data.form.get('checkIn').value;
        const checkOut = this.data.form.get('checkOut').value;
        const packagePath = lodgingPackage.object.path;
        this.lodgingActions.getAvailableLodgings(packagePath, checkIn, checkOut, lodgingsOfType.map(lodging => lodging.objectIdentifier));
        return this.lodgingStore.getAvailableLodgings(packagePath, checkIn, checkOut);
      })
    );

    // Create the detailed lodging used for selection and display
    this.detailedLodgings$ = combineLatest(
      filteredLodgings$,
      available$
    ).pipe(
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

  public selectLodging(detailedLodging: DetailedLodging): void {
    this.selectedLodging = detailedLodging;
  }

  public done(): void {
    this.dialogRef.close(this.selectedLodging);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private filterLodgingTypes(searchInput: string, lodgingTypes: LocalObject<LodgingType, number>[]): LocalObject<LodgingType, number>[] {
    if (typeof (searchInput) === 'string') {
      const filterValue = searchInput.toLowerCase();
      return lodgingTypes.filter(lodgingType => lodgingType.object.name.toLowerCase().indexOf(filterValue) === 0);
    }
    return lodgingTypes;
  }

  private filterLodgings(searchInput: string, lodgings: LocalObject<Lodging, number>[]): LocalObject<Lodging, number>[] {
    const filterValue = searchInput.toLowerCase();

    return lodgings.filter(lodging => lodging.object.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public displayFn(lodgingType: LocalObject<LodgingType, number>): string {
    return lodgingType.object.name;
  }
}
