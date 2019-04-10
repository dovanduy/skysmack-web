import { RecordActionsBase, ReduxAction, Effect, EffectRequest, OfflineMeta, ReduxOfflineMeta, GetIntervalPayload } from '@skysmack/redux';
import { HttpMethod, HttpResponse, LocalObject, NumIndex, StrIndex } from '@skysmack/framework';
import { LodgingReservationsAppState } from './lodging-reservations-reducer';
import { Store } from 'redux';
import { CheckIn } from '../../models/check-in';
import { LodgingReservation } from '../../models/lodging-reservation';
import { LODGING_RESERVATIONS_REDUX_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS } from '../../constants';

export class LodgingReservationsActions extends RecordActionsBase<LodgingReservationsAppState, Store<LodgingReservationsAppState>> {
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

    constructor(protected store: Store<LodgingReservationsAppState>) { super(store, LODGING_RESERVATIONS_REDUX_KEY, LODGING_RESERVATIONS_ADDITIONAL_PATHS); }

    public checkIn(packagePath: string, entity: LocalObject<LodgingReservation, number>, checkIns: CheckIn[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CHECK_IN_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }
    public undoCheckIn(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CHECK_IN_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }

    public cancel(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CANCEL_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }
    public undoCancel(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CANCEL_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }

    public checkOut(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.CHECK_OUT_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }
    public undoCheckOut(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_CHECK_OUT_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }

    public move(packagePath: string, entity: LocalObject<LodgingReservation, number>, moves: CheckIn[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.MOVE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }

    public undoMove(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_MOVE_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }

    public noShow(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.NO_SHOW_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }
    public undoNoShow(packagePath: string, entity: LocalObject<LodgingReservation, number>, reservationIds: number[]) {
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
                            value: entity,
                            queueItems: []
                        }
                    }),
                    new ReduxAction({
                        type: this.prefix + LodgingReservationsActions.UNDO_NO_SHOW_FAILURE,
                        meta: {
                            stateKey: packagePath,
                            value: entity,
                            queueItems: []
                        }
                    })
                )
            )
        })));
    }

    public getMessageParams(record: LocalObject<LodgingReservation, number>): StrIndex<string> {
        return {
            id: 'Object'
        };
    }
}