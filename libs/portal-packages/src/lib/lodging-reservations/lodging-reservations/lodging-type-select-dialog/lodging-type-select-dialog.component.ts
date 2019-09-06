import { Component, OnInit } from '@angular/core';
import { NgLodgingTypesActions, NgLodgingTypesStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { PagedQuery, LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';
import { Observable, combineLatest } from 'rxjs';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map, switchMap, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ss-lodging-type-select-dialog',
  templateUrl: './lodging-type-select-dialog.component.html'
})
export class LogdingTypeSelectDialogComponent implements OnInit {
  public autoCompleteControl = new FormControl();
  public filteredLodgingTypes$: Observable<LocalObject<LodgingType, number>[]>;

  constructor(
    private router: Router,
    private skysmackStore: NgSkysmackStore,
    private lodgingTypesActions: NgLodgingTypesActions,
    private lodgingTypesStore: NgLodgingTypesStore,
    public dialogRef: MatDialogRef<LogdingTypeSelectDialogComponent>
  ) { }

  ngOnInit() {
    const packagePath = this.router.url.split('/')[1];
    const lodgingTypePackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]);
    const allLodgingTypes$ = lodgingTypePackage$.pipe(
      switchMap(lodgingPackage => {
        this.lodgingTypesActions.getPaged(lodgingPackage.object.path, new PagedQuery());
        return this.lodgingTypesStore.get(lodgingPackage.object.path);
      })
    );

    this.filteredLodgingTypes$ = combineLatest(
      this.autoCompleteControl.valueChanges.pipe(startWith('')),
      allLodgingTypes$
    ).pipe(
      map(([searchInput, lodgingTypes]) => searchInput ? this.filterLodgingTypes(searchInput, lodgingTypes) : lodgingTypes.slice())
    );

    // Get available lodging types count
    // START HERE: Get selected checkin and out date. Get their fields via putting form helper in dialog data object.
    // this.lodgingTypesActions.getAvailableLodgingTypesCount(packagePath, this.startOfMonth, this.endOfMonth, this.selectedLodgingTypeIds);
    this.lodgingTypesStore.getAvailableLodgingTypesCount(packagePath);
  }

  public selectLodgingType(lodgingType: LocalObject<LodgingType, number>): void {
    this.dialogRef.close(lodgingType);
  }

  private filterLodgingTypes(searchInput: string, lodgingTypes: LocalObject<LodgingType, number>[]): LocalObject<LodgingType, number>[] {
    const filterValue = searchInput.toLowerCase();

    return lodgingTypes.filter(lodgingType => lodgingType.object.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
