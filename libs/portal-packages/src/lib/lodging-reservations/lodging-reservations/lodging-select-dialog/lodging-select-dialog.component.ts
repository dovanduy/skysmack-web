import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore, NgLodgingsActions, NgLodgingsStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject, RSQLFilterBuilder } from '@skysmack/framework';
import { LodgingType, DetailedLodgingType, DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, switchMap, take, filter, startWith, tap, distinctUntilChanged } from 'rxjs/operators';
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
    const packagePath = this.router.url.split('/')[1];
    const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
      filter(x => !!x),
      take(1)
    );

    // On init, set selected lodging type
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

    // On init, set selected lodging (if any)
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


    // TODO: Unsubscribe on destroy
    // If lodging type value changes, change the options in the select list
    const allLodgingsOfType$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      lodgingPackage$
    ).pipe(
      filter(([selectedLodgingType, lodgingPackage]) => !!selectedLodgingType && selectedLodgingType.object && !!lodgingPackage),
      switchMap(([selectedLodgingType, lodgingPackage]) => {
        const builder = new RSQLFilterBuilder();
        builder.column('lodgingTypeId').equalTo(selectedLodgingType.object.id);
        this.lodgingActions.getPaged(lodgingPackage.object.path, new PagedQuery({ rsqlFilter: builder }));
        return this.lodgingStore.get(lodgingPackage.object.path).pipe(filter(x => !!x && Array.isArray(x)), map(lodgings => lodgings.filter(lodging => lodging.object.lodgingTypeId === selectedLodgingType.object.id)), filter(x => x.length > 0), take(1));
      })
    );

    //#region Lodging type defaults and selection
    // Get all lodging types
    // let getLodgingTypesOnce = false; // Prevent multiple requests
    const allLodgingTypes$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
        return this.lodgingTypesStore.get(lodgingPackage.object.path).pipe(filter(x => !!x), take(1));
      })
    );

    // Set default lodging type
    // let getOnce = false; // Prevent multiple requests
    // combineLatest(
    //   lodgingPackage$,
    //   this.selectedLodgingType$
    // ).pipe(
    //   switchMap(([lodgingPackage, selectedLodgingType]) => {
    //     const selectedLodgingTypeId = selectedLodgingType ? selectedLodgingType.object.id : this.data.form.get('lodgingTypeId').value;
    //     if (!getOnce) {
    //       this.lodgingTypesActions.getSingle(lodgingPackage.object.path, selectedLodgingTypeId);
    //       getOnce = true;
    //     }
    //     return this.lodgingTypesStore.getSingle(lodgingPackage.object.path, selectedLodgingTypeId);
    //   }),
    //   filter(x => !!x),
    //   take(1),
    //   // map(selectedLodgingType => this.updateSelectedLodgingType(selectedLodgingType))
    // ).subscribe();

    // Filter lodging types based on search input
    this.filteredLodgingTypes$ = combineLatest(
      this.lodgingTypesAutoCompleteControl.valueChanges,
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes.slice())
    );
    // //#endregion

    // //#region Lodging selection
    // const allLodgings$ = combineLatest(
    //   lodgingPackage$,
    //   this.selectedLodgingType$
    // ).pipe(
    //   switchMap(([lodgingPackage, selectedLodgingType]) => {
    //     if (this.isItOkayToGetLodgings) {
    //       const builder = new RSQLFilterBuilder();
    //       builder.column('lodgingTypeId').equalTo(selectedLodgingType.object.id);

    //       this.lodgingActions.getPaged(lodgingPackage.object.path, new PagedQuery({ rsqlFilter: builder }));
    //       this.isItOkayToGetLodgings = false;
    //     }
    //     return this.lodgingStore.get(lodgingPackage.object.path);
    //   })
    // );

    // // Filter lodgings by the selected lodging type
    // const lodgingsFilteredByType$ = combineLatest(
    //   allLodgings$,
    //   this.selectedLodgingType$.pipe(filter(x => !!x))
    // ).pipe(
    //   map(([lodgings, selectedLodgingType]) => {
    //     return lodgings.filter(lodging => lodging.object.lodgingTypeId === selectedLodgingType.object.id)
    //   })
    // );

    // Filter lodgings based on search input
    const filteredLodgings$ = combineLatest(
      this.lodgingsAutoCompleteControl.valueChanges.pipe(startWith('')),
      allLodgingsOfType$
    ).pipe(
      map(([searchInput, lodgings]) => searchInput ? this.filterLodgings(searchInput, lodgings) : lodgings.slice())
    );

    // // Get ids for all filtered lodgings
    // const lodgingIds$ = filteredLodgings$.pipe(
    //   map(lodgings => lodgings.map(lodging => lodging.object.id))
    // );

    // // Get availability for all filtered lodgings
    const available$ = combineLatest(
      lodgingPackage$,
      allLodgingsOfType$ //lodgingIds$.pipe(take(1)), // Take prevents loop
    ).pipe(
      switchMap(([lodgingPackage, lodgingsOfType]) => {
        const checkIn = this.data.form.get('checkIn').value;
        const checkOut = this.data.form.get('checkOut').value;
        const packagePath = lodgingPackage.object.path;
        this.lodgingActions.getAvailableLodgings(packagePath, checkIn, checkOut, lodgingsOfType.map(lodging => lodging.objectIdentifier));
        return this.lodgingStore.getAvailableLodgings(packagePath, checkIn, checkOut);
      })
    );

    // // Create the detailed lodging used for selection and display
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
    //#endregion
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
