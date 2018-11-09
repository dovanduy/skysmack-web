import { Component, OnInit } from '@angular/core';
import { ExpressionValues } from '../../../models/expression-values';
import { RecurringMonth } from '../../../models/recurring-month';
import { RecurringMonths } from '../../../models/recurring-months';

@Component({
  selector: 'ss-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent extends ExpressionValues implements OnInit {

  public months: RecurringMonth[];
  public selectedMonths: RecurringMonth[];

  ngOnInit() {
    const recurringMonths = new RecurringMonths();
    this.months = recurringMonths.months();
  }

  public selectMonth(month: RecurringMonth): void {
    if (!this.selectedMonths) {
      this.selectedMonths = [];
    }

    const monthIndex = this.selectedMonths.map(x => x.month).indexOf(month.month);

    if (monthIndex > -1) {
      month.selected = false;
      this.selectedMonths.splice(monthIndex, 1);
    } else {
      month.selected = true;
      this.selectedMonths.push(month);
    }
    const sum = this.selectedMonths.map(x => x.value).reduce((a, b) => a + b, 0);

    this.selectedValues.next({
      months: sum
    });
  }
}
