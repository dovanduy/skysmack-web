import { Component, OnInit } from '@angular/core';
import { FieldBaseComponent } from 'framework';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material';
import { DateOnlyAdapter } from 'ui/fields/components/date-field/date-only-adapter';

@Component({
  selector: 'ss-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [DateOnlyAdapter, { provide: DateAdapter, useClass: DateOnlyAdapter }]
})
export class DateFieldComponent extends FieldBaseComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
    this.getFormField().valueChanges.subscribe((value: Date) => {
      if (value && typeof value.toISOString === 'function') {
        this.setFieldValue(moment(value).format('YYYY-MM-DD'));
      }
    });
  }
}
