import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgSkysmackStore, NgLodgingReservationsStore, NgLodgingReservationsActions } from '@skysmack/ng-packages';
import { NgReservationsMenu } from '../../ng-reservations-menu';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent, EventColor, EventAction } from 'calendar-utils';

import * as _moment from 'moment';
import { StrIndex } from '@skysmack/framework';
const moment = _moment;

@Component({
  selector: 'ss-lodgings-availablity',
  templateUrl: './lodgings-availablity.component.html',
  styleUrls: ['./lodgings-availablity.component.scss'],

})
export class LodgingsAvailablityComponent implements OnInit {
  public packagePath = this.router.url.split('/')[1];
  public events$: Observable<CalendarEvent[]>;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingReservationsStore,
    public actions: NgLodgingReservationsActions,
    public pageTitle: EntityComponentPageTitle,
    public sidebarMenu: NgReservationsMenu
  ) {
    pageTitle.setTitle('Availability');
  }

  ngOnInit() {
    this.requestPeriod(new Date());
    this.getAvailableLodgings();
  }

  public getAvailableLodgings() {
    this.requestPeriod(new Date());
    this.events$ = this.store.getAvailableLodgings(this.packagePath).pipe(toCalendarEvents());
  }

  public requestPeriod(date: Date) {

    const start = moment(date).startOf('month').format('YYYY-MM-DD');
    const end = moment(date).endOf('month').format('YYYY-MM-DD');
    this.actions.getAvailableLodgings(this.packagePath, start, end);
  }
}

const toCalendarEvents = () => pipe(
  map((dates: StrIndex<StrIndex<number>>) => Object.keys(dates).map(dateKey => {
    const date = dateKey;
    let freeLodgingsBadge = 0;

    const lodgingTypeBadges = Object.keys(dates[dateKey]).map(lodgingTypeKey => {
      const lodgingType = lodgingTypeKey;
      freeLodgingsBadge += dates[dateKey][lodgingTypeKey];

      return {
        type: lodgingType,
        free: dates[dateKey][lodgingTypeKey]
      };
    });

    return {
      start: new Date(date),
      title: '',
      color: { primary: '#0033cc', secondary: '#3399ff' } as EventColor,
      actions: [] as EventAction[],
      allDay: true,
      cssClass: 'available-booking',
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      meta: {
        freeLodgingsBadge,
        lodgingTypeBadges
      }
    } as CalendarEvent;
  })),
);
