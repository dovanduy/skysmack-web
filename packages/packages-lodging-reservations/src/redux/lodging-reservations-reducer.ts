import { LocalPageTypes, StrIndex, LocalObject, HttpSuccessResponse, replaceLocalInnerObject, LocalObjectExtensions, LocalObjectStatus } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState, sharedReducer } from '@skysmack/redux';
import { LodgingReservation } from '../models/lodging-reservation';
import { LodgingReservationsActions } from './lodging-reservations-actions';
import { StateKeyMeta } from '@skysmack/redux';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.lodgingReservations (where lodgingReservations is the reducer name.)
 */
export class LodgingReservationsAppState extends AppState {
    public lodgingReservations: LodgingReservationsState;
}

export class LodgingReservationsState implements RecordState<LodgingReservation, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingReservation, number>>> = {};
    public availableLodgings: StrIndex<StrIndex<StrIndex<number>>> = {};
}


const updateLodgingReservation = (action, newState) => {
    const castedAction = action as ReduxAction<HttpSuccessResponse<any>, any>;
    const body = castedAction.payload.body;
    const updatedObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject<LodgingReservation, number>(castedAction.meta.value, newObject));
    newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<LodgingReservation, number>(newState.localRecords[castedAction.meta.stateKey], updatedObjects, LocalObjectStatus.MODIFYING);
    return newState;
}

export function lodgingReservationsReducer(state = new LodgingReservationsState(), action: ReduxAction, prefix: string = 'LODGING_RESERVATIONS_'): LodgingReservationsState {
    state = sharedReducer(state, action, new LodgingReservationsState());
    const newState = Object.assign({}, state);

    switch (action.type) {
        // GET AVAILABLE LODGINGS
        case prefix + LodgingReservationsActions.GET_AVAILABLE_LODGINGS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>;
            // TODO: Merge available lodgings instead of overwriting them.
            newState.availableLodgings[castedAction.meta.stateKey] = castedAction.payload;
            return newState;
        }
        case prefix + LodgingReservationsActions.GET_AVAILABLE_LODGINGS_FAILURE: {
            console.log('error:', action);
            return newState;
        }

        // CHECK IN
        case prefix + LodgingReservationsActions.CHECK_IN_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.CHECK_IN_FAILURE: {
            console.log('error: ', action);
            return newState;
        }
        case prefix + LodgingReservationsActions.UNDO_CHECK_IN_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.UNDO_CHECK_IN_FAILURE: {
            console.log('error: ', action);
            return newState;
        }

        // CANCEL
        case prefix + LodgingReservationsActions.CANCEL_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.CANCEL_FAILURE: {
            console.log('error: ', action);
            return newState;
        }
        case prefix + LodgingReservationsActions.UNDO_CANCEL_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.UNDO_CANCEL_FAILURE: {
            console.log('error: ', action);
            return newState;
        }

        // CHECK OUT
        case prefix + LodgingReservationsActions.CHECK_OUT_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.CHECK_OUT_FAILURE: {
            console.log('error: ', action);
            return newState;
        }
        case prefix + LodgingReservationsActions.UNDO_CHECK_OUT_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.UNDO_CHECK_OUT_FAILURE: {
            console.log('error: ', action);
            return newState;
        }

        // MOVE
        case prefix + LodgingReservationsActions.MOVE_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.MOVE_FAILURE: {
            console.log('error: ', action);
            return newState;
        }
        case prefix + LodgingReservationsActions.UNDO_MOVE_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.UNDO_MOVE_FAILURE: {
            console.log('error: ', action);
            return newState;
        }

        // NO SHOW
        case prefix + LodgingReservationsActions.NO_SHOW_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.NO_SHOW_FAILURE: {
            console.log('error: ', action);
            return newState;
        }
        case prefix + LodgingReservationsActions.UNDO_NO_SHOW_SUCCESS: {
            return updateLodgingReservation(action, newState);
        }
        case prefix + LodgingReservationsActions.UNDO_NO_SHOW_FAILURE: {
            console.log('error: ', action);
            return newState;
        }

        default: {
            return {
                ...state,
                ...recordReducersBase<LodgingReservationsState, LodgingReservation, number>(state, action, prefix)
            };
        }
    }
}
