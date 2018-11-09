import { Component, OnInit } from '@angular/core';
import { ExpressionValues } from '../../../models/expression-values';
import { DayOfWeek, DaysOfWeek } from 'lib/portal-ui/components/fields';

@Component({
  selector: 'ss-day-of-week',
  templateUrl: './day-of-week.component.html',
  styleUrls: ['./day-of-week.component.scss']
})
export class DayOfWeekComponent extends ExpressionValues implements OnInit {

  public days: DayOfWeek[];
  public selectedDays: DayOfWeek[];

  public lastIsSelected: boolean;
  public daySelected = false;
  public allDay: DayOfWeek;

  public recurringOption: string;

  ngOnInit() {
    const daysOfWeek = new DaysOfWeek();
    this.days = daysOfWeek.days();
    this.allDay = {
      day: 'Day',
      value: 127,
      selected: false
    };
  }

  public setDay(day: any): void {
    if (!this.selectedDays) {
      this.selectedDays = [];
    }

    if (day.day === 'Day') {
      this.deselectOtherDays(day);
      this.allDay.selected = true;
    } else {
      const dayIndex = this.selectedDays.map(x => x.day).indexOf(day.day);
      this.deselectAll();

      if (dayIndex === -1) {
        day.selected = true;
        this.selectedDays.push(day);
      } else {
        day.selected = false;
        this.selectedDays.splice(dayIndex, 1);
      }
    }
    this.updateValues();
  }

  public deselectAll() {
    this.daySelected = true;
    this.allDay.selected = false;
    const selectedDay = this.selectedDays.map(x => x.day).indexOf('Day');
    if (selectedDay > -1) {
      this.selectedDays = [];
    }

    this.updateValues();
  }

  public deselectOtherDays(day: DayOfWeek): void {
    for (const dayViewModel of this.days) {
      dayViewModel.selected = false;
    }
    this.selectedDays = [];
    this.selectedDays.push(day);

    this.updateValues();
  }

  public optionSelected(value): void {
    // If option is 'last' show day pill!
    this.lastIsSelected = value === 5;
    this.recurringOption = value;
    this.updateValues();
  }

  public updateValues() {
    let sum = 0;
    if (this.selectedDays) {
      sum = this.selectedDays.map(x => x.value).reduce((a, b) => a + b, 0);
    }

    this.selectedValues.next({
      daysOfWeek: sum,
      recurringOption: this.recurringOption
    });
  }
}
