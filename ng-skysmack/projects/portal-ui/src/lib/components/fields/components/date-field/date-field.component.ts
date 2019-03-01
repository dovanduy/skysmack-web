import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import * as _moment from 'moment';
import { DateAdapter } from '@angular/material';
import { DateOnlyAdapter } from './date-only-adapter';
import { Field } from '@skysmack/ng-ui';
const moment = _moment;

@Component({
  selector: 'ss-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [DateOnlyAdapter, { provide: DateAdapter, useClass: DateOnlyAdapter }]
})
export class DateFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
  }

  public init(fields: Field[]) {
    this.getFormField().valueChanges.subscribe((value: Date) => {
      if (value && typeof value.toISOString === 'function') {
        this.setFieldValue(moment(value).format('YYYY-MM-DD'));
      }
    });
  }
}
