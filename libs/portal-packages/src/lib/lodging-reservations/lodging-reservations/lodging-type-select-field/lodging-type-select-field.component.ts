import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { LodgingTypeSelectDialogComponent } from '../lodging-type-select-dialog/lodging-type-select-dialog.component';
import { take, tap, map, startWith, switchMap } from 'rxjs/operators';
import { LocalObject, SubscriptionHandler } from '@skysmack/framework';
import { LodgingType, DetailedLodgingType } from '@skysmack/packages-lodgings';
import { Observable, combineLatest } from 'rxjs';
import { NgLodgingTypesStore } from '@skysmack/ng-lodgings';
import { Router } from '@angular/router';
import { getPackageDendencyAsStream } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Component({
  selector: 'ss-lodging-type-select-field',
  templateUrl: './lodging-type-select-field.component.html',
  styleUrls: ['./lodging-type-select-field.component.scss']
})
export class LodgingTypeSelectFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public selectedLodgingType: LocalObject<LodgingType, number>;
  public datesSelected$: Observable<boolean>;
  protected subscriptionHandler = new SubscriptionHandler();

  constructor(
    private dialog: MatDialog,
    private lodgingTypeStore: NgLodgingTypesStore,
    private skysmackStore: NgSkysmackStore,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setDatesSelected$();
    this.setSelectedLodgingType();
  }

  ngOnDestroy() {
    this.subscriptionHandler.unsubscribe();
  }

  public selectLodgingType(): void {
    this.subscriptionHandler.register(this.dialog.open(LodgingTypeSelectDialogComponent, { data: { form: this.fh.form } }).afterClosed().pipe(
      tap((detailedLodgingType: DetailedLodgingType) => {
        const selectedLodgingType = detailedLodgingType && detailedLodgingType.lodgingType;
        if (selectedLodgingType && selectedLodgingType.object && selectedLodgingType.object.id) {
          this.setFieldValue(selectedLodgingType.object.id);
          this.selectedLodgingType = selectedLodgingType;
        }
      }),
      take(1)
    ).subscribe());
  }

  private setSelectedLodgingType(): void {
    const selectedLodgingTypeId = this.getFieldValue();
    if (selectedLodgingTypeId) {
      const packagePath = this.router.url.split('/')[1];
      this.subscriptionHandler.register(getPackageDendencyAsStream(this.skysmackStore, packagePath, [0]).pipe(
        switchMap(_package => this.lodgingTypeStore.getSingle(_package.object.path, selectedLodgingTypeId))
      ).pipe(
        tap(selectedLodgingType => this.selectedLodgingType = selectedLodgingType),
        take(1)
      ).subscribe());
    }
  }

  private setDatesSelected$() {
    const checkInControl = this.fh.form.get('checkIn');
    const checkOutControl = this.fh.form.get('checkOut');
    this.datesSelected$ = combineLatest([
      checkInControl.valueChanges.pipe(startWith(checkInControl.value)),
      checkOutControl.valueChanges.pipe(startWith(checkOutControl.value))
    ]).pipe(
      map(([checkIn, checkOut]) => checkIn && checkOut ? true : false)
    );
  }
}
