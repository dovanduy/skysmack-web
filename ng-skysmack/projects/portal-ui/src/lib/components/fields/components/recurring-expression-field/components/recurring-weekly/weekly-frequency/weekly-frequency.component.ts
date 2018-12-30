import { Component } from '@angular/core';
import { ExpressionValues } from '../../../models/expression-values';

@Component({
  selector: 'ss-weekly-frequency',
  templateUrl: './weekly-frequency.component.html',
  styleUrls: ['./weekly-frequency.component.scss']
})
export class WeeklyFrequencyComponent extends ExpressionValues {
  private _selectedFrequency: number;
  public get selectedFrequency(): number {
    return this._selectedFrequency;
  }
  public set selectedFrequency(v: number) {
    this.selectedValues.emit({
      weekly: v
    });
    this._selectedFrequency = v;
  }

  setSuffix(value: number) {
    if (value <= 1) {
      return 'week';
    } else {
      return 'weeks';
    }
  }
}
