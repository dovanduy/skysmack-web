import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { AddField } from '@skysmack/ng-fields';
import { FormHelper, Field } from '@skysmack/ng-dynamic-forms';
import { Observable } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ss-add-record-field',
  templateUrl: './add-record-field.component.html'
})
export class AddRecordFieldComponent extends FieldBaseComponent<AddField> implements OnInit {

  public addFields$: Observable<Field[]>;
  public adding: boolean;
  public added: any[] = [];

  constructor(public skysmackStore: NgSkysmackStore) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const addField = this.field as AddField;
    this.addFields$ = this.skysmackStore.getCurrentPackage(addField.packagePath).pipe(
      switchMap(loadedPackage => addField.fieldsConfig.getFields(loadedPackage, addField.additionalPaths))
    );
  }

  public toggleAdding() {
    this.adding = !this.adding;
  }

  public onAddSubmit(fh: FormHelper) {
    const postedValues = fh.form.getRawValue();
    let currentValues = this.getFieldValue();

    if (!currentValues) {
      currentValues = [];
    }

    currentValues.push(postedValues);

    this.added = currentValues;
    this.setFieldValue(currentValues);
    this.toggleAdding();
  }

  public remove(index: number) {
    this.added.splice(index, 1);
    this.setFieldValue(this.added);
  }

}
