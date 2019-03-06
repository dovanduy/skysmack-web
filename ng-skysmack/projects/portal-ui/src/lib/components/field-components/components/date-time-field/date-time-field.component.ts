import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { combineLatest, fromEvent } from 'rxjs';
import { FieldBaseComponent } from '../field-base-component';
import { DateTimeAdapter } from './date-time-adapter';
import { Field } from '@skysmack/ng-ui';

@Component({
  selector: 'ss-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss'],
  providers: [DateTimeAdapter, { provide: DateAdapter, useClass: DateTimeAdapter }]
})
export class DateTimeFieldComponent extends FieldBaseComponent implements AfterViewInit, OnInit {

  @ViewChild('timeInput') public timeInput: ElementRef;

  ngOnInit() {
    super.ngOnInit();
  }

  public init(fields: Field[]) { }

  ngAfterViewInit() {
    combineLatest(
      this.getFormField().valueChanges,
      fromEvent(this.timeInput.nativeElement, 'input'),
    ).subscribe(values => {
      const date: Date = new Date(values[0]);
      let time = this.timeInput.nativeElement.value;
      if (date && typeof date.toISOString === 'function') {
        time = time ? time : '00:00';
        const hours = time.split(':')[0];
        const minutes = time.split(':')[1];

        date.setMinutes(Number(minutes));
        date.setHours(Number(hours));

        this.setFieldValue(date);
      }
    });
  }
}