import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { LodgingsDoorwaysAppState } from '.';
import { LODGINGS_DOORWAYS_REDUX_KEY, LODGINGS_DOORWAYS_ADDITIONAL_PATHS } from '../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysActions extends RecordActionsBase<LodgingsDoorwaysAppState, NgRedux<LodgingsDoorwaysAppState>> {
    constructor(protected store: NgRedux<LodgingsDoorwaysAppState>) { super(store, LODGINGS_DOORWAYS_REDUX_KEY, LODGINGS_DOORWAYS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingDoorway, LodgingDoorwayKey>): StrIndex<string> {
        return {
            id: ''
        };
    }
}
