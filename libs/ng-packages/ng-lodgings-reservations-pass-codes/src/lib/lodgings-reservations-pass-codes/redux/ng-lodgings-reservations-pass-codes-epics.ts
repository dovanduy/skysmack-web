import { NgLodgingsReservationsPassCodesRequests } from './ng-lodgings-reservations-pass-codes-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { NgLodgingsReservationsPassCodesNotifications } from '../ng-lodgings-reservations-pass-codes-notifications';
import { LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY } from './../constants/constants';
import { LodgingReservationPassCode, LodgingReservationPassCodeKey } from '../models/lodging-reservation-pass-code';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';


@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesEpics extends RecordEpicsBase<LodgingReservationPassCode, LodgingReservationPassCodeKey> {
    constructor(
        protected requests: NgLodgingsReservationsPassCodesRequests,
        protected notifications: NgLodgingsReservationsPassCodesNotifications,
        private lodgingsStore: NgLodgingsStore,
        private lodgingsActions: NgLodgingsActions,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private skysmackStore: NgSkysmackStore
    ) {
        super(requests, LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY,
                relationIdSelector: 'lodgingId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingsStore,
                actions: this.lodgingsActions,
                dependencyIndexes: [0]
            }),
            ...getReadDependencies({
                prefix: LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY,
                relationIdSelector: 'doorwayId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.doorwaysStore,
                actions: this.doorwaysActions,
                dependencyIndexes: [1]
            })
        ]);
    }
}
