import { EntityCrudIndex } from './entity-crud-index';
import { OnInit } from '@angular/core';
import { CalendarEvent, EventAction, EventColor } from 'calendar-utils';
import { Observable, pipe } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { LodgingsReservationsFeatureRedux } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-redux/lodgings-reservations-feature-redux';
import { LodgingsReservationsFeatureFieldsConfig } from 'features/lodgings-reservations-feature/lodgings-reservations-feature-fields-config';
import { Dictionary } from 'framework/models/dictionary';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


export class EntityCrudIndexTimePaged extends EntityCrudIndex implements OnInit {

    public events$: Observable<CalendarEvent[]>;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public redux: LodgingsReservationsFeatureRedux,
        public fieldsConfig: LodgingsReservationsFeatureFieldsConfig,
    ) {
        super(router, activatedRoute, redux, fieldsConfig);
    }

    ngOnInit() {
        super.ngOnInit();
        this.requestPeriod(new Date());
        this.getAvailableLodgings();
    }

    public requestPeriod(date: Date) {
        const start = moment(date).startOf('month').format('YYYY-MM-DD');
        const end = moment(date).endOf('month').format('YYYY-MM-DD');
        this.redux.requestAvailableLodgings(this.path, start, end);
    }

    public getAvailableLodgings() {
        this.events$ = this.redux.getAvailableLodgings(this.path).pipe(toCalendarEvents());
    }
}

const toCalendarEvents = () => pipe(
    map((dates: { date: Dictionary<{ date: { [key: string]: number; } }> }) => Object.keys(dates).map(dateKey => {
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