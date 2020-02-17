import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { AddField } from '@skysmack/ng-fields';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddRecordDialogComponent } from './add-record-dialog/add-record-dialog.component';

@Component({
  selector: 'ss-add-record-field',
  templateUrl: './add-record-field.component.html'
})
export class AddRecordFieldComponent extends FieldBaseComponent<AddField> implements OnInit {

  public added: any[] = [];

  constructor(
    public skysmackStore: NgSkysmackStore,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public add() {
    this.subscriptionHandler.register(this.dialog.open(AddRecordDialogComponent, {
      minWidth: 320,
      data: this.field
    }).afterClosed().pipe(
      tap((postedValues: any) => {
        if (postedValues) {
          console.log(postedValues);
          let currentValues = this.getFieldValue();

          if (!currentValues) {
            currentValues = [];
          }

          currentValues.push(postedValues);

          this.added = currentValues;
          this.setFieldValue(currentValues);
        }
      })
    ).subscribe());
  }

  public remove(index: number) {
    this.added.splice(index, 1);
    this.setFieldValue(this.added);
  }

}
