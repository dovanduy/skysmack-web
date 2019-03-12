import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgSkysmackStore, NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-packages';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent, EventColor, EventAction } from 'calendar-utils';

import * as _moment from 'moment';
import { PagedQuery, defined } from '@skysmack/framework';
import { NgLodgingsMenu } from '../../ng-lodgings-menu';
import { SelectFieldOption } from '@skysmack/ng-ui';
const moment = _moment;

@Component({
  selector: 'ss-lodgings-availablity',
  templateUrl: './lodgings-availablity.component.html',
  styleUrls: ['./lodgings-availablity.component.scss'],

})
export class LodgingsAvailablityComponent implements OnInit {
  public packagePath = this.router.url.split('/')[1];
  public events$: Observable<CalendarEvent[]>;
  public selectedLodgingIds: number[] = [];
  public lodgingOptions$: Observable<SelectFieldOption[]>;
  public currentSelectedDate: Date = new Date();
  public startOfMonth: string;
  public endOfMonth: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingsStore,
    public actions: NgLodgingsActions,
    public pageTitle: EntityComponentPageTitle,
    public sidebarMenu: NgLodgingsMenu
  ) {
    pageTitle.setTitle('Availability');
  }

  ngOnInit() {
    this.setCurrentDate(new Date());
    this.getLodgings();
    this.requestPeriod(this.currentSelectedDate);
    this.setAvailableLodgings();
  }

  public requestPeriod(date: Date) {
    this.setCurrentDate(date);
    this.getAvailableLodgings();
  }

  public getAvailableLodgings() {
    this.actions.getAvailableLodgings(this.packagePath, this.startOfMonth, this.endOfMonth, this.selectedLodgingIds);
  }

  private getLodgings() {
    this.actions.getPaged(this.packagePath, new PagedQuery());
    this.lodgingOptions$ = this.store.get(this.packagePath).pipe(
      map(lodgings => {
        return lodgings.map(x => ({ value: x.object.id, displayName: x.object.name } as SelectFieldOption));
      }),
      defined()
    );
  }

  private setCurrentDate(date: Date) {
    this.currentSelectedDate = date;
    this.startOfMonth = moment(this.currentSelectedDate).startOf('month').format('YYYY-MM-DD');
    this.endOfMonth = moment(this.currentSelectedDate).endOf('month').format('YYYY-MM-DD');
  }

  private setAvailableLodgings() {
    this.requestPeriod(this.currentSelectedDate);

    this.events$ = combineLatest(
      this.store.get(this.packagePath),
      this.store.getAvailableLodgings(this.packagePath)
    ).pipe(
      map(values => {
        const lodgings = values[0];
        const dates = values[1];

        return Object.keys(dates).map(dateKey => {
          const date = dateKey;
          let freeLodgingsBadges: {
            id: string,
            name: string,
            available: boolean
          }[];


          freeLodgingsBadges = this.selectedLodgingIds.map(selectedLodgingId => {
            const lodgingName = lodgings.find(lodging => lodging.object.id === selectedLodgingId).object.name;
            return {
              id: date.split('T')[0] + lodgingName,
              name: lodgingName,
              available: dates[dateKey].includes(selectedLodgingId)
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
              freeLodgingsBadges
            }
          } as CalendarEvent;
        });
      })
    );
  }
}
