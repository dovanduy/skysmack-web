import { Component } from '@angular/core';
import { ExpressionValues } from '../../models';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'ss-recurring-daily',
  templateUrl: './recurring-daily.component.html',
  styleUrls: ['./recurring-daily.component.scss']
})
export class RecurringDailyComponent extends ExpressionValues {
  public resetValues(event: MatTabChangeEvent) {
    this.selectedValues.emit({
      dates: [],
      daily: 0,
      daysOfWeek: 0,
      recurringOption: 0
    });
  }
}
