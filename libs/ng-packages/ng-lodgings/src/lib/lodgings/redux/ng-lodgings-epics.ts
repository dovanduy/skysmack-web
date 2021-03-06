import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Lodging, LODGINGS_REDUX_KEY } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingsRequests } from './ng-lodgings-requests';
import { NgLodgingsNotifications } from '../ng-lodgings-notifications';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { switchMap } from 'rxjs/operators';
import { NgLodgingTypesStore } from '../../lodging-types/redux/ng-lodgings-types-store';
import { NgLodgingTypesActions } from '../../lodging-types/redux/ng-lodging-types-actions';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgLodgingsActions } from './ng-lodgings-actions';


@Injectable({ providedIn: 'root' })
export class NgLodgingsEpics extends RecordEpicsBase<Lodging, number> {
    constructor(
        protected requests: NgLodgingsRequests,
        protected notifications: NgLodgingsNotifications,
        protected lodgingTypesStore: NgLodgingTypesStore,
        protected lodgingTypesActions: NgLodgingTypesActions,
        protected skysmackStore: NgSkysmackStore
    ) {
        super(requests, LODGINGS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            this.getAvailableLodgingsEpic,
            this.getAvailableLodgingsDailyEpic
        ]);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGINGS_REDUX_KEY,
                relationIdSelector: 'lodgingTypeId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingTypesStore,
                actions: this.lodgingTypesActions
            })
        ]);
    }


    public getAvailableLodgingsEpic = (action$: ActionsObservable<any>): Observable<ReduxAction<StrIndex<StrIndex<boolean>>> | ReduxAction<HttpErrorResponse>> => action$.pipe(
        ofType(NgLodgingsActions.GET_AVAILABLE_LODGINGS),
        switchMap((action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>) => this.requests.getAvailableLodgings(action))
    )

    public getAvailableLodgingsDailyEpic = (action$: ActionsObservable<any>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> => action$.pipe(
        ofType(NgLodgingsActions.GET_AVAILABLE_LODGINGS_DAILY),
        switchMap((action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>) => this.requests.getAvailableLodgingsDaily(action))
    )
}
