import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { AddField } from '../../../../fields/add-field';
import { NgFieldActions, NgFieldStore } from '@skysmack/ng-redux';
import { FormHelper, Field } from '@skysmack/ng-ui';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ss-add-record-field',
  templateUrl: './add-record-field.component.html'
})
export class AddRecordFieldComponent extends FieldBaseComponent<AddField> implements OnInit {

  public addFields$: Observable<Field[]>;

  constructor(

  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    const addField = this.field as AddField;
    this.addFields$ = of([]); // addField.fieldsConfig.getFields();
  }

  public onCreateSubmit(fh: FormHelper) {
    console.log(this.fh.form);
  }

}
