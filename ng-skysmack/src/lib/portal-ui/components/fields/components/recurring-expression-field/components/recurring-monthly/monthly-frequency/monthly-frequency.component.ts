import { Component, OnInit } from '@angular/core';
import { ExpressionValues } from '../../../models/expression-values';

@Component({
  selector: 'ss-monthly-frequency',
  templateUrl: './monthly-frequency.component.html',
  styleUrls: ['./monthly-frequency.component.scss']
})
export class MonthlyFrequencyComponent extends ExpressionValues implements OnInit {
  private _selectedFrequency: number;
  public get selectedFrequency(): number {
    return this._selectedFrequency;
  }
  public set selectedFrequency(v: number) {
    this.selectedValues.emit({
      monthly: v
    });
    this._selectedFrequency = v;
  }

  ngOnInit() {
  }

  setSuffix(value: number) {
    if (value <= 1) {
      return 'month';
    } else {
      return 'months';
    }
  }
}
