import { Component } from '@angular/core';
import { ExpressionValues } from '../../models/expression-values';

@Component({
  selector: 'ss-recurring-time',
  templateUrl: './recurring-time.component.html',
  styleUrls: ['./recurring-time.component.scss']
})
export class RecurringTimeComponent extends ExpressionValues {
  public resetValues() {
    this.selectedValues.emit({
      hours: 0,
      hourly: 0,
      minutes: 0,
      minutly: 0,
      seconds: 0,
      secondly: 0,
    });
  }
}
