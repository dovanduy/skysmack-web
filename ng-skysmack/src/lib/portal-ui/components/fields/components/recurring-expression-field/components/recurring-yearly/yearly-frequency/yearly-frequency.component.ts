import { Component } from '@angular/core';
import { ExpressionValues } from 'ui/fields/components/recurring-expression-field/models/expression-values';

@Component({
  selector: 'ss-yearly-frequency',
  templateUrl: './yearly-frequency.component.html',
  styleUrls: ['./yearly-frequency.component.scss']
})
export class YearlyFrequencyComponent extends ExpressionValues {

  private _selectedFrequency: number;
  public get selectedFrequency(): number {
    return this._selectedFrequency;
  }
  public set selectedFrequency(v: number) {
    this.selectedValues.emit({
      yearly: v
    });
    this._selectedFrequency = v;
  }

  setSuffix(value: number) {
    if (value <= 1) {
      return 'year';
    } else {
      return 'years';
    }
  }
}
