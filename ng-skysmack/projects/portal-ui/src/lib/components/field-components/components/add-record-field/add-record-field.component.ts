import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { AddField } from '../../../../fields/add-field';

@Component({
  selector: 'ss-add-record-field',
  templateUrl: './add-record-field.component.html'
})
export class AddRecordFieldComponent extends FieldBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    console.log((this.field as AddField).fieldsConfig);
  }

}
