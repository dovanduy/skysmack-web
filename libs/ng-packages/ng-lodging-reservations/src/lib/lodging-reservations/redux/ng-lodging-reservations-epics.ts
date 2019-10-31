import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { LodgingReservation, LODGING_RESERVATIONS_REDUX_KEY } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsRequests } from './ng-lodging-reservations-requests';
import { Injectable } from '@angular/core';
import { NgLodgingReservationsNotifications } from '../ng-lodging-reservations-notifications';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { NgLodgingReservationsActions } from './ng-lodging-reservations-actions';
import { HttpErrorResponse } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgLodgingTypesStore, NgLodgingTypesActions, NgLodgingsActions, NgLodgingsStore } from '@skysmack/ng-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsEpics extends RecordEpicsBase<LodgingReservation, number> {
    constructor(
        protected requests: NgLodgingReservationsRequests,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingTypesStore: NgLodgingTypesStore,
        protected lodgingTypesActions: NgLodgingTypesActions,
        protected lodgingsActions: NgLodgingsActions,
        protected lodgingsStore: NgLodgingsStore,
        protected notifications: NgLodgingReservationsNotifications
    ) {
        super(requests, LODGING_RESERVATIONS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_RESERVATIONS_REDUX_KEY,
                relationIdSelector: 'lodgingTypeId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingTypesStore,
                actions: this.lodgingTypesActions,
                dependencyIndexes: [0]
            }),
            ...getReadDependencies({
                prefix: LODGING_RESERVATIONS_REDUX_KEY,
                relationIdSelector: 'lodgingId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingsStore,
                actions: this.lodgingsActions,
                dependencyIndexes: [0]
            }),
            this.snackBarCheckInFailureEpic,
            this.snackBarUndoCheckInFailureEpic,
            this.snackBarCheckOutFailureEpic,
            this.snackBarUndoCheckOutFailureEpic,
            this.snackBarCancelFailureEpic,
            this.snackBarUndoCancelFailureEpic,
            this.snackBarMoveFailureEpic,
            this.snackBarUndoMoveFailureEpic,
            this.snackBarNoShowFailureEpic,
            this.snackBarUndoNoShowFailureEpic
        ]);
    }

    public snackBarCheckInFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.CHECK_IN_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.CHECK_IN_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarUndoCheckInFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.UNDO_CHECK_IN_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.UNDO_CHECK_IN_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarCheckOutFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.CHECK_OUT_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.CHECK_OUT_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarUndoCheckOutFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.UNDO_CHECK_OUT_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.UNDO_CHECK_OUT_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarCancelFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.CANCEL_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.CANCEL_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarUndoCancelFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.UNDO_CANCEL_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.UNDO_CANCEL_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarMoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.MOVE_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.MOVE_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarUndoMoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.UNDO_MOVE_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.UNDO_MOVE_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarNoShowFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.NO_SHOW_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.NO_SHOW_FAILURE + this.NOTIFICATION };
        })
    )

    public snackBarUndoNoShowFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, any>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + NgLodgingReservationsActions.UNDO_NO_SHOW_FAILURE),
        map((action) => {
            this.notifications.getBackendError(action);
            return { type: NgLodgingReservationsActions.UNDO_NO_SHOW_FAILURE + this.NOTIFICATION };
        })
    )

}
