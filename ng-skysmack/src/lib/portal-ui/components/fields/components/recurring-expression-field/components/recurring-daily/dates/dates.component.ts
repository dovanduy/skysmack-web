import { Component, OnInit } from '@angular/core';
import { ExpressionValues } from 'ui/fields/components/recurring-expression-field/models';

@Component({
  selector: 'ss-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent extends ExpressionValues implements OnInit {

  public dates: number[];
  public selectedDates: number[];

  ngOnInit() {
    this.initDates();
  }

  public initDates(): void {
    if (!this.dates) {
      this.dates = [];
    }
    for (let i = 1; i <= 31; i++) {
      this.dates.push(i);
    }
  }

  public selectDate(date: number): void {
    if (!this.selectedDates) {
      this.selectedDates = [];
    }
    const dateIndex = this.selectedDates.indexOf(date);
    if (dateIndex === -1) {
      this.selectedDates.push(date);
    } else {
      this.selectedDates.splice(dateIndex, 1);
    }

    this.selectedValues.next({
      dates: this.selectedDates
    });
  }
}
