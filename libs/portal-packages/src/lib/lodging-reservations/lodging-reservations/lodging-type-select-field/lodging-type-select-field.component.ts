import { Component, OnInit } from '@angular/core';
import { Field } from '@skysmack/ng-dynamic-forms';
import { FieldBaseComponent } from '@skysmack/portal-fields';
import { MatDialog } from '@angular/material/dialog';
import { LogdingTypeSelectDialogComponent } from '../lodging-type-select-dialog/lodging-type-select-dialog.component';
import { take, tap } from 'rxjs/operators';
import { LocalObject } from '@skysmack/framework';
import { LodgingType } from '@skysmack/packages-lodgings';

@Component({
  selector: 'ss-lodging-type-select-field',
  templateUrl: './lodging-type-select-field.component.html'
})
export class LogdingTypeSelectFieldComponent extends FieldBaseComponent<Field> implements OnInit {

  public selectedLodgingType: LocalObject<LodgingType, number>;

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public selectLodgingType(): void {
    this.dialog.open(LogdingTypeSelectDialogComponent).afterClosed().pipe(
      tap((selectedLodgingType: LocalObject<LodgingType, number>) => {
        if (selectedLodgingType && selectedLodgingType.object && selectedLodgingType.object.id) {
          this.setFieldValue(selectedLodgingType.object.id);
          this.selectedLodgingType = selectedLodgingType;
        }
      }),
      take(1)
    ).subscribe();
  }
}
