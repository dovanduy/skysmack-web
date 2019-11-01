import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import * as _moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { DateOnlyAdapter } from './date-only-adapter';
import { Field } from '@skysmack/ng-dynamic-forms';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
const moment = _moment;

@Component({
  selector: 'ss-date-field',
  templateUrl: './date-field.component.html',
  providers: [DateOnlyAdapter, { provide: DateAdapter, useClass: DateOnlyAdapter }]
})
export class DateFieldComponent extends FieldBaseComponent<Field> implements AfterViewInit, OnInit {

  @ViewChild('dateInput', { static: false }) public dateInput: ElementRef;
  public date: string;

  public dateTime: Date;

  private dateFormats = [
    "DD-MM-YYYY",
    "L",
    "l",
    "YYYY-MM-DD"
  ];

  ngOnInit() {
    super.ngOnInit();
    this.updatePickerFields();
  }

  private updatePickerFields() {
    let myValue = this.getFieldValue();

    if (typeof myValue === 'string') {
      if (/\/Date\((\d*)\)\//.exec(myValue)) {
        myValue = new Date(myValue);
      } else {
        myValue = (moment(myValue)).toDate();
      }
    }

    if (myValue instanceof Date) {
      this.dateTime = myValue;
      const momentValue = moment(myValue).format('YYYY-MM-DD');
      if (momentValue !== this.getFieldValue()) {
        this.date = momentValue;
        this.setFieldValue(momentValue);
      }
    }
  }

  ngAfterViewInit() {
    this.subscriptionHandler.register(fromEvent(this.dateInput.nativeElement, 'input').pipe(
      map(() => this.dateChanged())
    ).subscribe());

    this.subscriptionHandler.register(this.fh.form.get(this.fieldKey).valueChanges.pipe(
      tap(() => this.updatePickerFields())
    ).subscribe());
  }

  private dateChanged() {
    const input = this.dateInput.nativeElement.value;
    let dateInput: Date;

    if (/\/Date\((\d*)\)\//.exec(input)) {
      dateInput = new Date(input);
    } else if (moment(input, this.dateFormats, true).isValid()) {
      dateInput = moment(input, this.dateFormats).toDate();
    }

    if (dateInput) {
      this.dateTime.setFullYear(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
      this.setFieldValue(moment(this.dateTime).format('YYYY-MM-DD'));
      this.runRules();
    }
  }

  public onDateChanged(event: Event) {
    this.dateChanged();
  }
}
