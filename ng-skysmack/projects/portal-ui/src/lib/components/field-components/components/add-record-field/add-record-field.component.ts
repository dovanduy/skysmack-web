import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { AddField } from '../../../../fields/add-field';
import { FormHelper, Field } from '@skysmack/ng-ui';
import { Observable, of } from 'rxjs';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'ss-add-record-field',
  templateUrl: './add-record-field.component.html'
})
export class AddRecordFieldComponent extends FieldBaseComponent<AddField> implements OnInit {

  public addFields$: Observable<Field[]>;

  constructor(public skysmackStore: NgSkysmackStore) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const addField = this.field as AddField;
    this.addFields$ = this.skysmackStore.getCurrentPackage(addField.packagePath).pipe(
      switchMap(loadedPackage => addField.fieldsConfig.getFields(loadedPackage)),
    );
  }

  public onCreateSubmit(fh: FormHelper) {
    console.log(this.fh.form);
  }

}
