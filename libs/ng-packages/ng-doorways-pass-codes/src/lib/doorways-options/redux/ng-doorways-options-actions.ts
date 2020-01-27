import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { DoorwaysOptionsAppState } from './../redux/doorways-options-reducer';
import { DOORWAYS_OPTIONS_REDUX_KEY, DOORWAYS_OPTIONS_ADDITIONAL_PATHS } from '../constants/constants';
import { DoorwayOption } from './../models/doorway-option';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysOptionsActions extends RecordActionsBase<DoorwaysOptionsAppState, NgRedux<DoorwaysOptionsAppState>> {
    constructor(protected store: NgRedux<DoorwaysOptionsAppState>) { super(store, DOORWAYS_OPTIONS_REDUX_KEY, DOORWAYS_OPTIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<DoorwayOption, number>): StrIndex<string> {
        return {
            id: ''
        };
    }
}
