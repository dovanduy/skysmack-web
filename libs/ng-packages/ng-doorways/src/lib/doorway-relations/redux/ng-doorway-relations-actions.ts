import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { DoorwayRelationsAppState } from '.';
import { DOORWAY_RELATIONS_REDUX_KEY, DOORWAY_RELATIONS_ADDITIONAL_PATHS } from './../constants/constants';
import { DoorwayRelation, DoorwayRelationKey } from './../models/doorway-relation';

@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsActions extends RecordActionsBase<DoorwayRelationsAppState, NgRedux<DoorwayRelationsAppState>> {
    constructor(protected store: NgRedux<DoorwayRelationsAppState>) { super(store, DOORWAY_RELATIONS_REDUX_KEY, DOORWAY_RELATIONS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<DoorwayRelation, DoorwayRelationKey>): StrIndex<string> {
        return {
            id: ''
        };
    }
}
