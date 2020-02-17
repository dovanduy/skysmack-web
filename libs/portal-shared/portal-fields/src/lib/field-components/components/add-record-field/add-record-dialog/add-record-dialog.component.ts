import { Component, OnInit, Inject } from '@angular/core';
import { AddField } from '@skysmack/ng-fields';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ss-add-record-dialog',
  templateUrl: './add-record-dialog.component.html'
})
export class AddRecordDialogComponent implements OnInit {
  public addFields$: Observable<Field[]>;

  constructor(
    public skysmackStore: NgSkysmackStore,
    private dialogRef: MatDialogRef<AddRecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public field: Field
  ) { }

  ngOnInit() {
    const addField = this.field as AddField;
    this.addFields$ = this.skysmackStore.getCurrentPackage(addField.packagePath).pipe(
      switchMap(loadedPackage => addField.fieldsConfig.getFields(loadedPackage))
    );
  }

  public onAddSubmit(fh: FormHelper) {
    fh.formValid(() => {
      this.dialogRef.close(fh.form.getRawValue());
    });
  }
}
