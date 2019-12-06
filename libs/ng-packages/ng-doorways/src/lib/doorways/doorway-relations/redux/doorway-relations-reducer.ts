import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, RecordState, recordReducersBase } from '@skysmack/redux';
import { sharedReducer } from '@skysmack/redux';
import { DoorwayRelation, DoorwayRelationKey } from '../../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUCER_KEY, DOORWAY_RELATIONS_REDUX_KEY } from '../../constants/constants';

/**
 * This is to be used when you want to access doorway-relations via the GLOBAL state. E.g. state.doorway-relations (where doorway-relations is the reducer name.)
 */
export class DoorwayRelationsAppState extends AppState {
    public doorwayRelations: DoorwayRelationsState;
}

export class DoorwayRelationsState implements RecordState<DoorwayRelation, DoorwayRelationKey> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<DoorwayRelationKey>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<DoorwayRelation, DoorwayRelationKey>>> = {};
}

export function doorwayRelationsReducer(state = new DoorwayRelationsState(), action: ReduxAction, prefix: string = DOORWAY_RELATIONS_REDUX_KEY): DoorwayRelationsState {
    state = sharedReducer(state, action, new DoorwayRelationsState(), DOORWAY_RELATIONS_REDUCER_KEY);

    switch (action.type) {
        default:
            return {
                ...state,
                ...recordReducersBase<DoorwayRelationsState, DoorwayRelation, DoorwayRelationKey>(state, action, prefix)
            };
    }
}
