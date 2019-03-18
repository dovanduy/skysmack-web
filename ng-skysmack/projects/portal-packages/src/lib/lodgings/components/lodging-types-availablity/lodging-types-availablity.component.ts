import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityComponentPageTitle } from '@skysmack/portal-ui';
import { NgSkysmackStore, NgLodgingTypesStore, NgLodgingTypesActions } from '@skysmack/ng-packages';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent, EventColor, EventAction } from 'calendar-utils';

import * as _moment from 'moment';
import { PagedQuery, defined } from '@skysmack/framework';
import { SelectFieldOption } from '@skysmack/ng-ui';
import { NgLodgingTypesAvailabilityMenu } from '../../ng-lodging-types-availability-menu';
import { CalendarMonthViewDay } from 'angular-calendar';
const moment = _moment;

@Component({
  selector: 'ss-lodging-types-availablity',
  templateUrl: './lodging-types-availablity.component.html',
  styleUrls: ['./lodging-types-availablity.component.scss'],

})
export class LodgingTypesAvailablityComponent implements OnInit {
  public packagePath = this.router.url.split('/')[1];
  public events$: Observable<CalendarEvent[]>;
  public selectedLodgingTypeIds: number[] = [];
  public lodgingTypeOptions$: Observable<SelectFieldOption[]>;
  public currentSelectedDate: Date = new Date();
  public startOfMonth: string;
  public endOfMonth: string;

  public view = 'month';
  private _viewDate: Date = new Date();
  public get viewDate(): Date {
    return this._viewDate;
  }
  public set viewDate(date: Date) {
    this.requestPeriod(date);
    this._viewDate = date;
  }

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public skysmackStore: NgSkysmackStore,
    public store: NgLodgingTypesStore,
    public actions: NgLodgingTypesActions,
    public pageTitle: EntityComponentPageTitle,
    public sidebarMenu: NgLodgingTypesAvailabilityMenu
  ) {
    pageTitle.setTitle('Lodging types Availability');
  }

  ngOnInit() {
    this.setCurrentDate(new Date());
    this.getLodgings();
    this.requestPeriod(this.currentSelectedDate);
    this.setAvailableLodgings();
  }

  public requestPeriod(date: Date) {
    this.setCurrentDate(date);
    this.getAvailableLodgingTypes();
  }

  public getAvailableLodgingTypes() {
    this.actions.getAvailableLodgingTypes(this.packagePath, this.startOfMonth, this.endOfMonth, this.selectedLodgingTypeIds);
  }

  public beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      cell.events.forEach((event: CalendarEvent<any>) => {
        cell['freeLodgingTypes'] = event.meta.freeLodgingTypes;
      });
    });
  }

  public trackById(index: any, item: any) {
    return item.id;
  }

  private getLodgings() {
    this.actions.getPaged(this.packagePath, new PagedQuery());
    this.lodgingTypeOptions$ = this.store.get(this.packagePath).pipe(
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
      this.store.getAvailableLodgingTypes(this.packagePath)
    ).pipe(
      map(values => {
        const lodgings = values[0];
        const idIndex = values[1];

        const result = Object.keys(idIndex).map(idKey => {
          const dates = idIndex[idKey];
          return Object.keys(dates).map(dateKey => {
            const date = dateKey;
            let freeLodgingTypes: {
              id: string,
              name: string,
              count: number
            }[];


            freeLodgingTypes = this.selectedLodgingTypeIds.map(selectedLodgingTypeId => {
              const lodgingTypeName = lodgings.find(lodging => lodging.object.id === selectedLodgingTypeId).object.name;
              return {
                id: date.split('T')[0] + lodgingTypeName,
                name: lodgingTypeName,
                count: dates[dateKey].length
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
                freeLodgingTypes
              }
            } as CalendarEvent;
          });
        }).reduce((acc, current) => acc.concat(current), []).filter(x => x);

        return result;
      })
    );
  }
}
