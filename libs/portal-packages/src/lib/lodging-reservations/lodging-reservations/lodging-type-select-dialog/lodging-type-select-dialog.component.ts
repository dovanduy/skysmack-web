import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { LodgingType, DetailedLodgingType } from '@skysmack/packages-lodgings';
import { Observable, combineLatest } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, switchMap, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationsPricingsTypeId } from '@skysmack/package-types';

@Component({
  selector: 'ss-lodging-type-select-dialog',
  templateUrl: './lodging-type-select-dialog.component.html'
})
export class LodgingTypeSelectDialogComponent implements OnInit {
  public autoCompleteControl = new FormControl();
  public detailedLodgingTypes$: Observable<DetailedLodgingType[]>;

  constructor(
    private router: Router,
    private skysmackStore: NgSkysmackStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private lodgingTypesStore: NgLodgingTypesStore,
    private dialogRef: MatDialogRef<LodgingTypeSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { form: FormGroup }
  ) { }

  ngOnInit() {
    const packagePath = this.router.url.split('/')[1];
    const lodgingPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]);

    //#region availability
    // Get all lodging types
    let once1 = false; // Prevent multiple requests
    const allLodgingTypes$ = lodgingPackage$.pipe(
      switchMap(lodgingPackage => {
        if (!once1) {
          this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
          once1 = true;
        }
        return this.lodgingTypesStore.get(lodgingPackage.object.path);
      })
    );

    // Filter lodging types based on search input
    const filteredLodgingTypes$ = combineLatest(
      this.autoCompleteControl.valueChanges.pipe(startWith('')),
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes.slice())
    );

    // Get ids for all filtered lodging types
    const lodgingTypeIds$ = filteredLodgingTypes$.pipe(
      map(lodgingTypes => lodgingTypes.map(lodgingType => lodgingType.object.id))
    );

    // Get availability for all filtered lodging types
    let once2 = false; // Prevent multiple requests
    const availableCount$ = combineLatest(
      lodgingPackage$,
      lodgingTypeIds$
    ).pipe(
      switchMap(([lodgingPackage, lodgingTypeIds]) => {
        const checkIn = this.data.form.get('checkIn').value;
        const checkOut = this.data.form.get('checkOut').value;
        const packagePath = lodgingPackage.object.path;
        if (!once2) {
          this.lodgingTypesActions.getAvailableLodgingTypesCount(packagePath, checkIn, checkOut, lodgingTypeIds);
          once2 = true;
        }
        return this.lodgingTypesStore.getAvailableLodgingTypesCount(packagePath);
      }),
    );
    //#endregion

    // Create the detailed lodging types used for selection and display
    this.detailedLodgingTypes$ = combineLatest(
      filteredLodgingTypes$,
      availableCount$
    ).pipe(
      map(([lodgingTypes, availableCount]) => {
        return lodgingTypes.map(lodgingType => {
          return new DetailedLodgingType({
            lodgingType,
            availableCount: availableCount[lodgingType.object.id] ? availableCount[lodgingType.object.id].length : 0
          })
        })
      })
    );
  }

  public selectLodgingType(detailedLodgingType: DetailedLodgingType): void {
    this.dialogRef.close(detailedLodgingType);
  }

  private filterLodgingTypes(searchInput: string, lodgingTypes: LocalObject<LodgingType, number>[]): LocalObject<LodgingType, number>[] {
    const filterValue = searchInput.toLowerCase();

    return lodgingTypes.filter(lodgingType => lodgingType.object.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
