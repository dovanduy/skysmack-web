import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingReservationsAppState, LodgingReservationsActions, CheckIn } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsActions extends LodgingReservationsActions {
    public static GET_AVAILABLE_LODGINGS = 'GET_AVAILABLE_LODGINGS';
    public static GET_AVAILABLE_LODGINGS_SUCCESS = 'GET_AVAILABLE_LODGINGS_SUCCESS';
    public static GET_AVAILABLE_LODGINGS_ERROR = 'GET_AVAILABLE_LODGINGS_ERROR';

    public static CHECK_IN = 'CHECK_IN';
    public static CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
    public static CHECK_IN_ROLLBACK = 'CHECK_IN_ROLLBACK';
    public static UNDO_CHECK_IN = 'UNDO_CHECK_IN';
    public static UNDO_CHECK_IN_SUCCESS = 'UNDO_CHECK_IN_SUCCESS';
    public static UNDO_CHECK_IN_ROLLBACK = 'UNDO_CHECK_IN_ROLLBACK';

    public static CHECK_OUT = 'CHECK_OUT';
    public static CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';
    public static CHECK_OUT_ROLLBACK = 'CHECK_OUT_ROLLBACK';
    public static UNDO_CHECK_OUT = 'UNDO_CHECK_OUT';
    public static UNDO_CHECK_OUT_SUCCESS = 'UNDO_CHECK_OUT_SUCCESS';
    public static UNDO_CHECK_OUT_ROLLBACK = 'UNDO_CHECK_OUT_ROLLBACK';

    public static CANCEL = 'CANCEL';
    public static CANCEL_SUCCESS = 'CANCEL_SUCCESS';
    public static CANCEL_ROLLBACK = 'CANCEL_ROLLBACK';
    public static UNDO_CANCEL = 'UNDO_CANCEL';
    public static UNDO_CANCEL_SUCCESS = 'UNDO_CANCEL_SUCCESS';
    public static UNDO_CANCEL_ROLLBACK = 'UNDO_CANCEL_ROLLBACK';

    public static MOVE = 'MOVE';
    public static MOVE_SUCCESS = 'MOVE_SUCCESS';
    public static MOVE_ROLLBACK = 'MOVE_ROLLBACK';
    public static UNDO_MOVE = 'UNDO_MOVE';
    public static UNDO_MOVE_SUCCESS = 'UNDO_MOVE_SUCCESS';
    public static UNDO_MOVE_ROLLBACK = 'UNDO_MOVE_ROLLBACK';

    public static NO_SHOW = 'NO_SHOW';
    public static NO_SHOW_SUCCESS = 'NO_SHOW_SUCCESS';
    public static NO_SHOW_ROLLBACK = 'NO_SHOW_ROLLBACK';
    public static UNDO_NO_SHOW = 'UNDO_NO_SHOW';
    public static UNDO_NO_SHOW_SUCCESS = 'UNDO_NO_SHOW_SUCCESS';
    public static UNDO_NO_SHOW_ROLLBACK = 'UNDO_NO_SHOW_ROLLBACK';

    constructor(protected store: NgRedux<LodgingReservationsAppState>) { super(store); }


    public checkIn(path: string, checkIns: CheckIn[]) {
        // this.store.dispatch(this.actions.checkIn(path, checkIns));
    }
    public undoCheckIn(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.undoCheckIn(path, reservationIds));
    }

    public cancel(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.cancel(path, reservationIds));
    }
    public undoCancel(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.undoCancel(path, reservationIds));
    }

    public checkOut(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.checkOut(path, reservationIds));
    }
    public undoCheckOut(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.undoCheckOut(path, reservationIds));
    }

    public move(path: string, moves: CheckIn[]) {
        // this.store.dispatch(this.actions.move(path, moves));
    }
    public undoMove(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.undoMove(path, reservationIds));
    }

    public noShow(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.noShow(path, reservationIds));
    }
    public undoNoShow(path: string, reservationIds: number[]) {
        // this.store.dispatch(this.actions.undoNoShow(path, reservationIds));
    }


    // public getAvailableLodgings(path: string, start: string, end: string): AnyAction {
    //     return {
    //         type: LodgingsReservationsFeatureActions.GET_AVAILABLE_LODGINGS,
    //         payload: {
    //             path,
    //             start,
    //             end
    //         }
    //     };
    // }

    // public getAvailableLodgingsError(): Action {
    //     return { type: LodgingsReservationsFeatureActions.GET_AVAILABLE_LODGINGS_ERROR };
    // }

    // public getAvailableLodgingsSuccess(key: string, payload: any): GetSuccessAction<any> {
    //     return Object.assign({}, new GetSuccessAction<any>(
    //         LodgingsReservationsFeatureActions.GET_AVAILABLE_LODGINGS_SUCCESS,
    //         payload,
    //         key
    //     ));
    // }

    // public checkIn(path: string, checkIns: CheckinViewModel[]) {
    //     return Object.assign({}, new OfflineAction<LocalObject<ReservationViewModel>[]>(
    //         LodgingsReservationsFeatureActions.CHECK_IN,
    //         LodgingsReservationsFeatureActions.CHECK_IN_SUCCESS,
    //         LodgingsReservationsFeatureActions.CHECK_IN_ROLLBACK,
    //         undefined,
    //         path,
    //         this.requests.checkIn(path, checkIns)
    //     ));
    // }
    // public undoCheckIn(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<LocalObject<ReservationViewModel>[]>(
    //         LodgingsReservationsFeatureActions.UNDO_CHECK_IN,
    //         LodgingsReservationsFeatureActions.UNDO_CHECK_IN_SUCCESS,
    //         LodgingsReservationsFeatureActions.UNDO_CHECK_IN_ROLLBACK,
    //         undefined,
    //         path,
    //         this.requests.undoCheckIn(path, reservationIds)
    //     ));
    // }

    // public cancel(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<LocalObject<ReservationViewModel>[]>(
    //         LodgingsReservationsFeatureActions.CANCEL,
    //         LodgingsReservationsFeatureActions.CANCEL_SUCCESS,
    //         LodgingsReservationsFeatureActions.CANCEL_ROLLBACK,
    //         undefined,
    //         path,
    //         this.requests.cancel(path, reservationIds)
    //     ));
    // }
    // public undoCancel(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<LocalObject<ReservationViewModel>[]>(
    //         LodgingsReservationsFeatureActions.UNDO_CANCEL,
    //         LodgingsReservationsFeatureActions.UNDO_CANCEL_SUCCESS,
    //         LodgingsReservationsFeatureActions.UNDO_CANCEL_ROLLBACK,
    //         undefined,
    //         path,
    //         this.requests.undoCancel(path, reservationIds)
    //     ));
    // }

    // public checkOut(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<number[]>(
    //         LodgingsReservationsFeatureActions.CHECK_OUT,
    //         LodgingsReservationsFeatureActions.CHECK_OUT_SUCCESS,
    //         LodgingsReservationsFeatureActions.CHECK_OUT_ROLLBACK,
    //         reservationIds,
    //         path,
    //         this.requests.checkOut(path, reservationIds)
    //     ));
    // }
    // public undoCheckOut(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<number[]>(
    //         LodgingsReservationsFeatureActions.UNDO_CHECK_OUT,
    //         LodgingsReservationsFeatureActions.UNDO_CHECK_OUT_SUCCESS,
    //         LodgingsReservationsFeatureActions.UNDO_CHECK_OUT_ROLLBACK,
    //         reservationIds,
    //         path,
    //         this.requests.undoCheckOut(path, reservationIds)
    //     ));
    // }

    // public move(path: string, moves: CheckinViewModel[]) {
    //     return Object.assign({}, new OfflineAction<CheckinViewModel[]>(
    //         LodgingsReservationsFeatureActions.MOVE,
    //         LodgingsReservationsFeatureActions.MOVE_SUCCESS,
    //         LodgingsReservationsFeatureActions.MOVE_ROLLBACK,
    //         moves,
    //         path,
    //         this.requests.move(path, moves)
    //     ));
    // }
    // public undoMove(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<number[]>(
    //         LodgingsReservationsFeatureActions.UNDO_MOVE,
    //         LodgingsReservationsFeatureActions.UNDO_MOVE_SUCCESS,
    //         LodgingsReservationsFeatureActions.UNDO_MOVE_ROLLBACK,
    //         reservationIds,
    //         path,
    //         this.requests.undoMove(path, reservationIds)
    //     ));
    // }

    // public noShow(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<number[]>(
    //         LodgingsReservationsFeatureActions.NO_SHOW,
    //         LodgingsReservationsFeatureActions.NO_SHOW_SUCCESS,
    //         LodgingsReservationsFeatureActions.NO_SHOW_ROLLBACK,
    //         reservationIds,
    //         path,
    //         this.requests.noShow(path, reservationIds)
    //     ));
    // }
    // public undoNoShow(path: string, reservationIds: number[]) {
    //     return Object.assign({}, new OfflineAction<number[]>(
    //         LodgingsReservationsFeatureActions.UNDO_NO_SHOW,
    //         LodgingsReservationsFeatureActions.UNDO_NO_SHOW_SUCCESS,
    //         LodgingsReservationsFeatureActions.UNDO_NO_SHOW_ROLLBACK,
    //         reservationIds,
    //         path,
    //         this.requests.undoNoShow(path, reservationIds)
    //     ));
    // }
}
