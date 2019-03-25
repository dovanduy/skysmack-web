import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { fromEvent } from 'rxjs';
import { FieldBaseComponent } from '../field-base-component';
import { DateTimeAdapter } from './date-time-adapter';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss'],
  providers: [DateTimeAdapter, { provide: DateAdapter, useClass: DateTimeAdapter }]
})
export class DateTimeFieldComponent extends FieldBaseComponent implements AfterViewInit, OnInit {

  @ViewChild('timeInput') public timeInput: ElementRef;
  public time: string;

  @ViewChild('dateInput') public dateInput: ElementRef;
  public date: string;

  ngOnInit() {
    super.ngOnInit();
    this.setDate(this.getFieldValue());
    this.setTime(this.getFieldValue());
  }

  ngAfterViewInit() {
    this.subscriptionHandler.register(fromEvent(this.timeInput.nativeElement, 'input').pipe(
      map(() => this.updateFieldValue())
    ).subscribe());
  }

  public onTimeChanged(event: Event) {
    this.time = (event.target as any).value;
  }

  public updateFieldValue() {
    const date: Date = new Date(this.date);
    let time = this.time;
    if (date && typeof date.toISOString === 'function') {
      time = time ? time : '00:00';
      const hours = time.split(':')[0];
      const minutes = time.split(':')[1];

      date.setMinutes(Number(minutes));
      date.setHours(Number(hours));

      this.setFieldValue(date);
    }
  }

  private setDate(currentValue: string) {
    this.date = currentValue;
  }

  private setTime(currentValue: string) {
    if (currentValue && currentValue.length > 0) {
      const date = new Date(currentValue);
      if (date) {
        this.time = this.getTimeWithLeadingZeros(date.getHours()) + ':' + this.getTimeWithLeadingZeros(date.getMinutes());
      }
    }
  }

  private getTimeWithLeadingZeros(time: Number): string {
    return (time < 10 ? '0' : '') + time;
  }
}
