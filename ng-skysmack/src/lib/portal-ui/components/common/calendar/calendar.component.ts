import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';

@Component({
  selector: 'ss-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public view = 'month';
  @Input() public events: CalendarEvent[];
  @Output() public currentDate: EventEmitter<Date> = new EventEmitter();

  private _viewDate: Date = new Date();
  public get viewDate(): Date {
    return this._viewDate;
  }
  public set viewDate(v: Date) {
    this.currentDate.emit(v);
    this._viewDate = v;
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      cell.events.forEach((event: CalendarEvent<any>) => {
        cell['freeLodgingsBadge'] = event.meta.freeLodgingsBadge;
        cell['lodgingTypeBadges'] = event.meta.lodgingTypeBadges;
      });
    });
  }
}
