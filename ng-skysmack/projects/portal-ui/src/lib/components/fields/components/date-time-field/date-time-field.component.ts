import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { combineLatest, of, fromEvent } from 'rxjs';
import { FieldBaseComponent } from './../../../../fields/field-base-component';
import { DateTimeAdapter } from './date-time-adapter';

@Component({
  selector: 'ss-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss'],
  providers: [DateTimeAdapter, { provide: DateAdapter, useClass: DateTimeAdapter }]
})
export class DateTimeFieldComponent extends FieldBaseComponent implements AfterViewInit {

  @ViewChild('timeInput') public timeInput: ElementRef;

  ngAfterViewInit() {
    combineLatest(
      this.getFormField().valueChanges,
      fromEvent(this.timeInput.nativeElement, 'click')
    ).subscribe(values => {
      const date: Date = values[0];
      if (date && typeof date.toISOString === 'function') {
        let time = this.timeInput.nativeElement.value;
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
