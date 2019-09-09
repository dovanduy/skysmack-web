import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore, NgLodgingsActions, NgLodgingsStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { LodgingType, DetailedLodgingType, DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
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
  private selectedLodgingType$ = new BehaviorSubject<LocalObject<LodgingType, number>>(null);

  public lodgingsAutoCompleteControl = new FormControl();
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
    const packagePath = this.router.url.split('/')[1];
    const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]);
    const selectedLodgingTypeId = this.data.form.get('lodgingTypeId').value;
    // 1. List all lodging types in autocomplete field; set default to selected lodging type. MUST NOT MODIFY SELECTED LODGING TYPE -> USE FOR FILTER PURPOSES ONLY
    // 2. Use selected value above to filter available lodgings. Remember to check if they are available

    //#region Lodging type defaults and selection
    // Get all lodging types
    let getLodgingTypesOnce = false; // Prevent multiple requests
    const allLodgingTypes$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        if (!getLodgingTypesOnce) {
          this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
          getLodgingTypesOnce = true;
        }
        return this.lodgingTypesStore.get(lodgingPackage.object.path);
      })
    );

    // Set default lodging type
    let getOnce = false; // Prevent multiple requests
    lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        if (!getOnce) {
          this.lodgingTypesActions.getSingle(lodgingPackage.object.path, selectedLodgingTypeId);
          getOnce = true;
        }
        return this.lodgingTypesStore.getSingle(lodgingPackage.object.path, selectedLodgingTypeId);
      }),
      filter(x => !!x),
      take(1),
      map(selectedLodgingType => this.updateSelectedLodgingType(selectedLodgingType))
    ).subscribe();

    // Filter lodging types based on search input
    this.filteredLodgingTypes$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes.slice())
    );
    //#endregion

    //#region Lodging selection
    let getLodgingsOnce = false; // Prevent multiple requests
    const allLodgings$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        if (!getLodgingsOnce) {
          this.lodgingActions.getPaged(lodgingPackage.object.path, new PagedQuery());
          getLodgingsOnce = true;
        }
        return this.lodgingStore.get(lodgingPackage.object.path);
      })
    );

    const lodgingsFilteredByType$ = combineLatest(
      allLodgings$,
      this.selectedLodgingType$.pipe(filter(x => !!x))
    ).pipe(
      map(([lodgings, selectedLodgingType]) => {
        return lodgings.filter(lodging => lodging.object.lodgingTypeId === selectedLodgingType.object.id)
      })
    );

    // Filter lodging types based on search input
    const filteredLodgings$ = combineLatest(
      this.lodgingsAutoCompleteControl.valueChanges.pipe(startWith('')),
      lodgingsFilteredByType$
    ).pipe(
      map(([searchInput, lodgings]) => searchInput ? this.filterLodgings(searchInput, lodgings) : lodgings.slice())
    );

    // Get ids for all filtered lodgings
    const lodgingIds$ = filteredLodgings$.pipe(
      map(lodgings => lodgings.map(lodging => lodging.object.id))
    );

    // Get availability for all filtered lodgings
    let getAvailabilityOnce = false; // Prevent multiple requests
    const available$ = combineLatest(
      lodgingPackage$,
      lodgingIds$
    ).pipe(
      switchMap(([lodgingPackage, lodgingIds]) => {
        const checkIn = this.data.form.get('checkIn').value;
        const checkOut = this.data.form.get('checkOut').value;
        const packagePath = lodgingPackage.object.path;
        if (!getAvailabilityOnce) {
          this.lodgingActions.getAvailableLodgings(packagePath, checkIn, checkOut, lodgingIds);
          getAvailabilityOnce = true;
        }
        return this.lodgingStore.getAvailableLodgings(packagePath);
      }),
    );

    // Create the detailed lodging used for selection and display
    // this.detailedLodgings$ = combineLatest(
    //   filteredLodgings$,
    //   available$
    // ).pipe(
    //   map(([lodgings, available]) => {
    //     return lodgings.map(lodging => {
    //       return new DetailedLodging({
    //         lodging,
    //         available: !!available // TODO: Ensure this is the correct value. Might  need to use another redux flow / endpoint from backend.
    //       })
    //     })
    //   })
    // );

    //#endregion
  }

  public selectLodging(detailedLodging: DetailedLodging): void {
    this.dialogRef.close(detailedLodging);
  }

  private filterLodgingTypes(searchInput: string, lodgingTypes: LocalObject<LodgingType, number>[]): LocalObject<LodgingType, number>[] {
    const filterValue = searchInput.toLowerCase();

    return lodgingTypes.filter(lodgingType => lodgingType.object.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterLodgings(searchInput: string, lodgings: LocalObject<Lodging, number>[]): LocalObject<Lodging, number>[] {
    const filterValue = searchInput.toLowerCase();

    return lodgings.filter(lodging => lodging.object.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private updateSelectedLodgingType(lodgingType: LocalObject<LodgingType, number>): void {
    this.lodgingTypesAutoCompleteControl.setValue(lodgingType.object.name);
    this.selectedLodgingType$.next(lodgingType);
  }
}
