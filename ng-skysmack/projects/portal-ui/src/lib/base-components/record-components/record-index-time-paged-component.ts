import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Record, StrIndex } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-packages';
import { Observable, pipe } from 'rxjs';
import { CalendarEvent, EventAction, EventColor } from 'calendar-utils';
import { map } from 'rxjs/operators';
import { RecordIndexComponent } from './record-index-component';
import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import * as _moment from 'moment';
const moment = _moment;


export class RecordIndexTimePagedComponent<TAppState, TRecord extends Record<TKey>, TKey> extends RecordIndexComponent<TAppState, TRecord, TKey> implements OnInit {

    public events$: Observable<CalendarEvent[]>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public actions: RecordActionsBase<TAppState, NgRedux<TAppState>>,
        public skysmackStore: NgSkysmackStore,
        public store: NgRecordReduxStore<TAppState, TRecord, TKey>,
    ) {
        super(router, activatedRoute, actions, skysmackStore, store);
    }

    ngOnInit() {
        super.ngOnInit();
        this.requestPeriod(new Date());
        this.getAvailableLodgings();
    }

    public requestPeriod(date: Date) {
        const start = moment(date).startOf('month').format('YYYY-MM-DD');
        const end = moment(date).endOf('month').format('YYYY-MM-DD');
        // TODO: FIX THIS
        // this.store.requestAvailableLodgings(this.packagePath, start, end);
    }

    public getAvailableLodgings() {
        // TODO: FIX THIS
        // this.events$ = this.store.getAvailableLodgings(this.packagePath).pipe(toCalendarEvents());
    }
}

const toCalendarEvents = () => pipe(
    map((dates: { date: StrIndex<{ date: { [key: string]: number; } }> }) => Object.keys(dates).map(dateKey => {
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
