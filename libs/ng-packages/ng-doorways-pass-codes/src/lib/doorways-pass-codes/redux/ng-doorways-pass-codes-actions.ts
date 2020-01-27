import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { DoorwaysPassCodesAppState } from '.';
import { DOORWAYS_PASS_CODES_REDUX_KEY, DOORWAYS_PASS_CODES_ADDITIONAL_PATHS } from '../constants/constants';
import { DoorwayPassCode, DoorwayPassCodeKey } from './../models/doorway-pass-code';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesActions extends RecordActionsBase<DoorwaysPassCodesAppState, NgRedux<DoorwaysPassCodesAppState>> {
    constructor(protected store: NgRedux<DoorwaysPassCodesAppState>) { super(store, DOORWAYS_PASS_CODES_REDUX_KEY, DOORWAYS_PASS_CODES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<DoorwayPassCode, DoorwayPassCodeKey>): StrIndex<string> {
        return {
            id: ''
        };
    }
}
