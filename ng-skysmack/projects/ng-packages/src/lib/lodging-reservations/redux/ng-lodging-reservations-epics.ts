import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingReservation, LodgingReservationsActions } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsRequests } from './ng-lodging-reservations-requests';
import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { HttpErrorResponse, RSQLFilterBuilder, PagedQuery } from '@skysmack/framework';
import { switchMap, map, take } from 'rxjs/operators';
import { GetIntervalPayload, ReduxAction, GetPagedRecordsSuccessPayload } from '@skysmack/redux';
import { NgLodgingTypesActions } from './../../lodgings/redux/ng-lodging-types-actions';
import { NgSkysmackStore } from './../../skysmack-core/skysmack/redux/ng-skysmack-store';
import { NgLodgingsActions } from './../../lodgings/redux/ng-lodgings-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsEpics extends RecordEpicsBase<LodgingReservation, number> {
    constructor(
        protected requests: NgLodgingReservationsRequests,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingTypesActions: NgLodgingTypesActions,
        protected lodgingsActions: NgLodgingsActions
    ) {
        super(requests, 'LODGING_RESERVATIONS_');
        this.epics = this.epics.concat([
            this.getAvailableLodgingsEpic,
            this.getReservationLodgingTypesEpic,
            this.getReservationLodgingsEpic
        ]);
    }

    // TODO: Set proper return type.
    public getAvailableLodgingsEpic = (action$: ActionsObservable<any>): Observable<any | HttpErrorResponse> => action$.pipe(
        ofType(LodgingReservationsActions.GET_AVAILABLE_LODGINGS),
        switchMap((action: ReduxAction<GetIntervalPayload>) => this.requests.getAvailableLodgings(
            action.payload.packagePath,
            action.payload.start,
            action.payload.end
        ))
    )


    public getReservationLodgingTypesEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + LodgingReservationsActions.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedRecordsSuccessPayload<LodgingReservation, number>>) => {
            const lodgingTypeIds = Array.from(new Set(action.payload.records.map(record => record.lodgingTypeId).filter(x => x)));
            if (lodgingTypeIds && lodgingTypeIds.length > 0) {
                const rsqlFilter = new RSQLFilterBuilder();
                rsqlFilter.column('id').in(lodgingTypeIds);
                const query = new PagedQuery({ rsqlFilter });

                this.skysmackStore.getCurrentPackage(action.payload.packagePath).pipe(
                    map(_package => {
                        return this.lodgingTypesActions.getPaged(_package._package.dependencies[0], query);
                    }),
                    take(1),
                ).subscribe();
            }
        }),
        map(() => ({ type: 'RETRIEVED_LODGING_TYPES_BY_IDS' }))
    )

    public getReservationLodgingsEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + LodgingReservationsActions.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedRecordsSuccessPayload<LodgingReservation, number>>) => {
            const lodgingIds = Array.from(new Set(action.payload.records.map(record => record.allocatedLodgingId).filter(x => x)));
            if (lodgingIds && lodgingIds.length > 0) {
                const rsqlFilter = new RSQLFilterBuilder();
                rsqlFilter.column('id').in(lodgingIds);
                const query = new PagedQuery({ rsqlFilter });

                this.skysmackStore.getCurrentPackage(action.payload.packagePath).pipe(
                    map(_package => {
                        return this.lodgingsActions.getPaged(_package._package.dependencies[0], query);
                    }),
                    take(1)
                ).subscribe();
            }
        }),
        map(() => ({ type: 'RETRIEVED_LODGINGS_BY_IDS' }))
    )
}
