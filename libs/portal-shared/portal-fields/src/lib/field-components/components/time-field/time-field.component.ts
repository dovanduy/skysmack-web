import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base-component';
import { Field } from '@skysmack/ng-dynamic-forms';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ss-time-field',
  templateUrl: './time-field.component.html'
})
export class TimeFieldComponent extends FieldBaseComponent<Field> implements AfterViewInit, OnInit {
  @ViewChild('timeInput', { static: false }) public timeInput: ElementRef;
  public time: string;
  
  ngOnInit() {
    super.ngOnInit();
    this.time = this.getFieldValue();
  }

  ngAfterViewInit() {
    this.subscriptionHandler.register(fromEvent(this.timeInput.nativeElement, 'input').pipe(
      map(() => this.updateFieldValue())
    ).subscribe());
  }

  public updateFieldValue() {
    if (this.time.length > 0) {
      this.setFieldValue(this.time + ':00');
    } else {
      this.setFieldValue('00:00:00');
    }
  }

  public onTimeChanged(event: Event) {
    this.time = (event.target as any).value;
  }
}
