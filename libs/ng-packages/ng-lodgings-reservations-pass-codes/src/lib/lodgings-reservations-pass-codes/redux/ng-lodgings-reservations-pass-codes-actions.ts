import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY, LODGINGS_RESERVATIONS_PASS_CODES_ADDITIONAL_PATHS } from '../constants/constants';
import { LodgingReservationPassCode, LodgingReservationPassCodeKey } from '../models/lodging-reservation-pass-code';
import { LodgingsReservationsPassCodesAppState } from './lodgings-reservations-pass-codes-reducer';

@Injectable({ providedIn: 'root' })
export class NgLodgingsReservationsPassCodesActions extends RecordActionsBase<LodgingsReservationsPassCodesAppState, NgRedux<LodgingsReservationsPassCodesAppState>> {
    constructor(protected store: NgRedux<LodgingsReservationsPassCodesAppState>) { super(store, LODGINGS_RESERVATIONS_PASS_CODES_REDUX_KEY, LODGINGS_RESERVATIONS_PASS_CODES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingReservationPassCode, LodgingReservationPassCodeKey>): StrIndex<string> {
        return {
            id: ''
        };
    }
}
