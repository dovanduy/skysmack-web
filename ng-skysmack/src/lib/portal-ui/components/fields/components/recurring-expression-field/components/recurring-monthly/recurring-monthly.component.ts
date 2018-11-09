import { Component } from '@angular/core';
import { ExpressionValues } from '../../models/expression-values';

@Component({
  selector: 'ss-recurring-monthly',
  templateUrl: './recurring-monthly.component.html',
  styleUrls: ['./recurring-monthly.component.scss']
})
export class RecurringMonthlyComponent extends ExpressionValues {
  public resetValues() {
    this.selectedValues.emit({
      months: 0,
      monthly: 0
    });
  }
}
