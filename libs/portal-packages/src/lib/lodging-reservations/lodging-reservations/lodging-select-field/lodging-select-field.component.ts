import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { take, tap, map } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';
import { DetailedLodging, Lodging } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { LodgingSelectDialogComponent } from '../lodging-select-dialog/lodging-select-dialog.component';

@Component({
  selector: 'ss-lodging-select-field',
  templateUrl: './lodging-select-field.component.html',
  styleUrls: ['./lodging-select-field.component.scss']
})
export class LodgingSelectFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public selectedLodging: LocalObject<Lodging, number>;
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

  public selectLodging(): void {
    this.dialog.open(LodgingSelectDialogComponent, { data: { form: this.fh.form } }).afterClosed().pipe(
      tap((detailedLodging: DetailedLodging) => {
        const selectedLodging = detailedLodging && detailedLodging.lodging;
        if (selectedLodging && selectedLodging.object && selectedLodging.object.id) {
          this.setFieldValue(selectedLodging.object.id);
          this.selectedLodging = selectedLodging;
        }
      }),
      take(1)
    ).subscribe();
  }
  private setDatesSelected$() {
    this.datesSelected$ = this.fh.form.get('lodgingTypeId').valueChanges.pipe(map(x => x));
  }
}
