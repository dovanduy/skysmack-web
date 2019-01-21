import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState } from '@skysmack/redux';
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

export function lodgingReservationsReducer(state = new LodgingReservationsState(), action: ReduxAction, prefix: string = 'LODGING_RESERVATIONS_'): LodgingReservationsState {
    switch (action.type) {
        // GET AVAILABLE LODGINGS
        case prefix + LodgingReservationsActions.GET_AVAILABLE_LODGINGS_SUCCESS: {
            const castedAction = action as ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>;
            const availableLodgings = {};
            availableLodgings[castedAction.meta.stateKey] = castedAction.payload;
            return {
                ...state,
                availableLodgings
                // TODO: Merge available lodgings instead of overwriting them.
                // availableLodgings: DictionaryHelpers.mergeDictionaryCollectionImmutable(state.availableLodgings, action.meta.key, action.payload)
            };
        }
        case prefix + LodgingReservationsActions.GET_AVAILABLE_LODGINGS_FAILURE:
            console.log('error:', action);
            return { ...state };

        // CHECK IN
        // case prefix + LodgingReservationsActions.CHECK_IN_SUCCESS: {
        //     return {
        //         ...state,
        //         // entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // }
        // case prefix + LodgingReservationsActions.CHECK_IN_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case prefix + LodgingReservationsActions.UNDO_CHECK_IN_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.UNDO_CHECK_IN_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // CANCEL
        // case prefix + LodgingReservationsActions.CANCEL_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.CANCEL_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case prefix + LodgingReservationsActions.UNDO_CANCEL_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.UNDO_CANCEL_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // CHECK OUT
        // case prefix + LodgingReservationsActions.CHECK_OUT_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.CHECK_OUT_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case prefix + LodgingReservationsActions.UNDO_CHECK_OUT_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.UNDO_CHECK_OUT_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // MOVE
        // case prefix + LodgingReservationsActions.MOVE_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.MOVE_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case prefix + LodgingReservationsActions.UNDO_MOVE_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.UNDO_MOVE_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // NO SHOW
        // case prefix + LodgingReservationsActions.NO_SHOW_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.NO_SHOW_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case prefix + LodgingReservationsActions.UNDO_NO_SHOW_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case prefix + LodgingReservationsActions.UNDO_NO_SHOW_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        default:
            return {
                ...state,
                ...recordReducersBase<LodgingReservationsState, LodgingReservation, number>(state, action, prefix)
            };
    }
}
