import { Component, OnInit } from '@angular/core';
import { ExpressionValues } from '../../../models/expression-values';

@Component({
  selector: 'ss-time-unit',
  templateUrl: './time-unit.component.html'
})
export class TimeUnitComponent extends ExpressionValues {

  // HOURLY
  private _hourly: number;
  public get hourly(): number {
    return this._hourly;
  }
  public set hourly(v: number) {
    v = Number(v);

    this.selectedValues.emit({
      hourly: v
    });

    this._hourly = v;
  }

  // MINUTELY
  private _minutly: number;
  public get minutly(): number {
    return this._minutly;
  }
  public set minutly(v: number) {
    v = Number(v);
    this.selectedValues.emit({
      minutly: v
    });

    this._minutly = v;
  }

  // SECONDLY
  private _secondly: number;
  public get secondly(): number {
    return this._secondly;
  }
  public set secondly(v: number) {
    v = Number(v);
    this.selectedValues.emit({
      secondly: v
    });

    this._secondly = v;
  }

}
