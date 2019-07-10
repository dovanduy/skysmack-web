import { Component } from '@angular/core';
import { ExpressionValues } from '../../../models/expression-values';

@Component({
  selector: 'ss-daily-frequency',
  templateUrl: './daily-frequency.component.html',
  styleUrls: ['./daily-frequency.component.scss']
})
export class DailyFrequencyComponent extends ExpressionValues {

  private _selectedFrequency: number;
  public get selectedFrequency(): number {
    return this._selectedFrequency;
  }
  public set selectedFrequency(v: number) {
    this.selectedValues.emit({
      daily: v
    });
    this._selectedFrequency = v;
  }

  setSuffix(value: number) {
    if (value <= 1) {
      return 'day';
    } else {
      return 'days';
    }
  }
}
