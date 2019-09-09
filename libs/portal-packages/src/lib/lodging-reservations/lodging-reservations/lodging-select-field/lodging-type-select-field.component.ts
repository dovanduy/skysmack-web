import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { LogdingTypeSelectDialogComponent } from '../lodging-type-select-dialog/lodging-type-select-dialog.component';
import { take, tap, map } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';
import { LodgingType, DetailedLodgingType } from '@skysmack/packages-lodgings';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'ss-lodging-select-field',
  templateUrl: './lodging-select-field.component.html'
})
export class LogdingSelectFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public selectedLodgingType: LocalObject<LodgingType, number>;
  public datesSelected$: Observable<boolean>;

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.setDatesSelected$();
  }

  public selectLodgingType(): void {
    this.dialog.open(LogdingTypeSelectDialogComponent, { data: { form: this.fh.form } }).afterClosed().pipe(
      tap((detailedLodgingType: DetailedLodgingType) => {
        const selectedLodgingType = detailedLodgingType.lodgingType;
        if (selectedLodgingType && selectedLodgingType.object && selectedLodgingType.object.id) {
          this.setFieldValue(selectedLodgingType.object.id);
          this.selectedLodgingType = selectedLodgingType;
        }
      }),
      take(1)
    ).subscribe();
  }
  private setDatesSelected$() {
    this.datesSelected$ = combineLatest(
      this.fh.form.get('checkIn').valueChanges,
      this.fh.form.get('checkOut').valueChanges
    ).pipe(
      map(([checkIn, checkOut]) => checkIn && checkOut ? true : false)
    );
  }
}
