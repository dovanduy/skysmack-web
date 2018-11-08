import { Component } from '@angular/core';
import { ExpressionValues } from 'ui/fields/components/recurring-expression-field/models/expression-values';

@Component({
  selector: 'ss-specific-time',
  templateUrl: './specific-time.component.html',
  styleUrls: ['./specific-time.component.scss']
})
export class SpecificTimeComponent extends ExpressionValues {

  // HOURS
  private _hours: number;
  public get hours(): number {
    return this._hours;
  }
  public set hours(v: number) {
    v = Number(v);

    this.selectedValues.emit({
      hours: v
    });

    this._hours = v;
  }

  // MINUTES
  private _minutes: number;
  public get minutes(): number {
    return this._minutes;
  }
  public set minutes(v: number) {
    v = Number(v);
    this.selectedValues.emit({
      minutes: v
    });

    this._minutes = v;
  }

  // SECONDS
  private _seconds: number;
  public get seconds(): number {
    return this._seconds;
  }
  public set seconds(v: number) {
    v = Number(v);
    this.selectedValues.emit({
      seconds: v
    });

    this._seconds = v;
  }

}
