import { RecordActionsBase, ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { HttpMethod, NumIndex, HttpResponse } from '@skysmack/framework';
import { LodgingReservationsAppState } from './lodging-reservations-reducer';
import { Store } from 'redux';
import { CheckIn } from '../models/check-in';

export class LodgingReservationsActions extends RecordActionsBase<LodgingReservationsAppState, Store<LodgingReservationsAppState>> {
    public static GET_AVAILABLE_LODGINGS = 'GET_AVAILABLE_LODGINGS';
    public static GET_AVAILABLE_LODGINGS_SUCCESS = 'GET_AVAILABLE_LODGINGS_SUCCESS';
    public static GET_AVAILABLE_LODGINGS_FAILURE = 'GET_AVAILABLE_LODGINGS_FAILURE';

    public static CHECK_IN = 'CHECK_IN';
    public static CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
    public static CHECK_IN_FAILURE = 'CHECK_IN_FAILURE';
    public static UNDO_CHECK_IN = 'UNDO_CHECK_IN';
    public static UNDO_CHECK_IN_SUCCESS = 'UNDO_CHECK_IN_SUCCESS';
    public static UNDO_CHECK_IN_FAILURE = 'UNDO_CHECK_IN_FAILURE';

    public static CHECK_OUT = 'CHECK_OUT';
    public static CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';
    public static CHECK_OUT_FAILURE = 'CHECK_OUT_FAILURE';
    public static UNDO_CHECK_OUT = 'UNDO_CHECK_OUT';
    public static UNDO_CHECK_OUT_SUCCESS = 'UNDO_CHECK_OUT_SUCCESS';
    public static UNDO_CHECK_OUT_FAILURE = 'UNDO_CHECK_OUT_FAILURE';

    public static CANCEL = 'CANCEL';
    public static CANCEL_SUCCESS = 'CANCEL_SUCCESS';
    public static CANCEL_FAILURE = 'CANCEL_FAILURE';
    public static UNDO_CANCEL = 'UNDO_CANCEL';
    public static UNDO_CANCEL_SUCCESS = 'UNDO_CANCEL_SUCCESS';
    public static UNDO_CANCEL_FAILURE = 'UNDO_CANCEL_FAILURE';

    public static MOVE = 'MOVE';
    public static MOVE_SUCCESS = 'MOVE_SUCCESS';
    public static MOVE_FAILURE = 'MOVE_FAILURE';
    public static UNDO_MOVE = 'UNDO_MOVE';
    public static UNDO_MOVE_SUCCESS = 'UNDO_MOVE_SUCCESS';
    public static UNDO_MOVE_FAILURE = 'UNDO_MOVE_FAILURE';

    public static NO_SHOW = 'NO_SHOW';
    public static NO_SHOW_SUCCESS = 'NO_SHOW_SUCCESS';
    public static NO_SHOW_FAILURE = 'NO_SHOW_FAILURE';
    public static UNDO_NO_SHOW = 'UNDO_NO_SHOW';
    public static UNDO_NO_SHOW_SUCCESS = 'UNDO_NO_SHOW_SUCCESS';
    public static UNDO_NO_SHOW_FAILURE = 'UNDO_NO_SHOW_FAILURE';

    constructor(protected store: Store<LodgingReservationsAppState>) { super(store, 'LODGING_RESERVATIONS_', []); }

    public checkIn(packagePath: string, checkIns: CheckIn[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<CheckIn[], HttpResponse, CheckIn[]>>({
            type: this.prefix + LodgingReservationsActions.CHECK_IN,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<CheckIn[], HttpResponse, any>(
                    new Effect<CheckIn[]>(new EffectRequest<CheckIn[]>(
                        this.addAdditionalPaths(packagePath) + '/checkin',
                        HttpMethod.POST,
                        checkIns
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CHECK_IN_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: checkIns
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CHECK_IN_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: checkIns
                        }
                    })
                )
            )
        })));
    }
    public undoCheckIn(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.UNDO_CHECK_IN,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/undocheckin',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CHECK_IN_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CHECK_IN_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }

    public cancel(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.CANCEL,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/cancel',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CANCEL_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CANCEL_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }
    public undoCancel(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.UNDO_CANCEL,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/undocancel',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CANCEL_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CANCEL_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }

    public checkOut(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.CHECK_OUT,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/checkout',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CHECK_OUT_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CHECK_OUT_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }
    public undoCheckOut(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.UNDO_CHECK_OUT,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/undocheckout',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CHECK_OUT_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CHECK_OUT_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }

    public move(packagePath: string, moves: CheckIn[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<CheckIn[], HttpResponse, CheckIn[]>>({
            type: this.prefix + LodgingReservationsActions.MOVE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<CheckIn[], HttpResponse, any>(
                    new Effect<CheckIn[]>(new EffectRequest<CheckIn[]>(
                        this.addAdditionalPaths(packagePath) + '/move',
                        HttpMethod.POST,
                        moves
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.MOVE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: moves
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.MOVE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: moves
                        }
                    })
                )
            )
        })));
    }

    public undoMove(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.UNDO_MOVE,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/undomove',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_MOVE_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_MOVE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }

    public noShow(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.NO_SHOW,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/noshow',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.NO_SHOW_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.NO_SHOW_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }
    public undoNoShow(packagePath: string, reservationIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<any, ReduxOfflineMeta<number[], HttpResponse, number[]>>({
            type: this.prefix + LodgingReservationsActions.UNDO_NO_SHOW,
            meta: new ReduxOfflineMeta(
                new OfflineMeta<number[], HttpResponse, any>(
                    new Effect<number[]>(new EffectRequest<number[]>(
                        this.addAdditionalPaths(packagePath) + '/undonoshow',
                        HttpMethod.POST,
                        reservationIds
                    )),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_NO_SHOW_SUCCESS,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_NO_SHOW_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: reservationIds
                        }
                    })
                )
            )
        })));
    }

    public getAvailableLodgings(packagePath: string, start: string, end: string) {
        // this.store.dispatch({
        //     type: LodgingsReservationsFeatureActions.GET_AVAILABLE_LODGINGS,
        //     payload: {
        //         packagePath,
        //         start,
        //         end
        //     }
        // });
    }

    // EXAMPLES
    // public getLodgingReservationsRoles(packagePath: string, ids: number[]): void {
    //     this.store.dispatch(Object.assign({}, new ReduxAction<GetLodgingReservationsRolesPayload>({
    //         type: this.prefix + LodgingReservationsActions.GET_ROLES,
    //         payload: {
    //             packagePath,
    //             ids
    //         }
    //     })));
    // }

