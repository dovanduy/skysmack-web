import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import * as _moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { DateOnlyAdapter } from './date-only-adapter';
import { Field } from '@skysmack/ng-dynamic-forms';
const moment = _moment;

@Component({
  selector: 'ss-date-field',
  templateUrl: './date-field.component.html',
  providers: [DateOnlyAdapter, { provide: DateAdapter, useClass: DateOnlyAdapter }]
})
export class DateFieldComponent extends FieldBaseComponent<Field> implements OnInit {
  ngOnInit() {
    super.ngOnInit();
    const fieldValue = this.getFieldValue();
    const dateFormat = 'YYYY-MM-DD';
    if (fieldValue) {
      this.setFieldValue(moment(fieldValue).format(dateFormat));
    }

    this.getFormField().valueChanges.subscribe((value: Date) => {
      if (value && typeof value.toISOString === 'function') {
        this.setFieldValue(moment(value).format(dateFormat));
      }
    });
  }
}
