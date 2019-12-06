import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { DoorwaysAppState } from '.';
import { DOORWAYS_REDUX_KEY, DOORWAYS_ADDITIONAL_PATHS } from '../../constants/constants';
import { Doorway } from '../../models/doorway';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysActions extends RecordActionsBase<DoorwaysAppState, NgRedux<DoorwaysAppState>> {
    constructor(protected store: NgRedux<DoorwaysAppState>) { super(store, DOORWAYS_REDUX_KEY, DOORWAYS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Doorway, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
