import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { fromEvent } from 'rxjs';
import { FieldBaseComponent } from '../field-base-component';
import { DateTimeAdapter } from './date-time-adapter';
import { map } from 'rxjs/operators';
import { Field } from '@skysmack/ng-dynamic-forms';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'ss-date-time-field',
  templateUrl: './date-time-field.component.html',
  providers: [DateTimeAdapter, { provide: DateAdapter, useClass: DateTimeAdapter }]
})
export class DateTimeFieldComponent extends FieldBaseComponent<Field> implements AfterViewInit, OnInit {

  @ViewChild('timeInput', { static: false }) public timeInput: ElementRef;
  public time: string;

  @ViewChild('dateInput', { static: false }) public dateInput: ElementRef;
  public date: string;

  public dateTime: Date;

  private dateFormats = [
    "DD-MM-YYYY",
    "L",
    "l",
    "YYYY-MM-DD"
  ];

  private dateTimeFormats = [
    moment.ISO_8601,
    "YYYY-MM-DD'T'HH:mm:ss"
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
      } else if (moment(myValue, this.dateTimeFormats, true).isValid()) {
        myValue = moment(myValue, this.dateTimeFormats).toDate();
      }
    }

    if (myValue instanceof Date) {
      this.dateTime = myValue;
      const momentValue = moment(myValue);
      this.date = momentValue.format('YYYY-MM-DD');
      this.time = momentValue.format('HH:mm');

      this.setFieldValue(this.dateTime);
    }
  }

  ngAfterViewInit() {
    this.subscriptionHandler.register(fromEvent(this.timeInput.nativeElement, 'input').pipe(
      map(() => this.timeChanged())
    ).subscribe());
    this.subscriptionHandler.register(fromEvent(this.dateInput.nativeElement, 'input').pipe(
      map(() => this.dateChanged())
    ).subscribe());
  }

  private timeChanged(input: string = '') {
    if (!input || input.length === 0) {
      if (this.timeInput && this.timeInput.nativeElement && this.timeInput.nativeElement.value && this.timeInput.nativeElement.value.length > 0) {
        input = this.timeInput.nativeElement.value;
      } else {
        input = '00:00';
      }
    }

    const hours = input.split(':')[0];
    const minutes = input.split(':')[1];

    if (hours || minutes) {
      if (hours) {
        this.dateTime.setMinutes(Number(minutes));
      }

      if (minutes) {
        this.dateTime.setHours(Number(hours));
      }

      this.setFieldValue(this.dateTime);
      this.runRules();
    }
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
      this.setFieldValue(this.dateTime);
      this.runRules();
    }
  }

  public onTimeChanged(event: Event) {
    this.timeChanged((event.target as any).value);
  }

  public onDateChanged(event: Event) {
    this.dateChanged();
  }
}
