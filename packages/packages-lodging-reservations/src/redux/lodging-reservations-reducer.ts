import { LocalPageTypes, StrIndex, LocalObject } from '@skysmack/framework';
import { AppState, ReduxAction, recordReducersBase, RecordState } from '@skysmack/redux';
import { LodgingReservation } from '../models/lodging-reservation';
import { LodgingReservationsActions } from './lodging-reservations-actions';

/**
 * This is to be used when you want to access lodging reservations via the GLOBAL state. E.g. state.lodgingReservations (where lodgingReservations is the reducer name.)
 */
export class LodgingReservationsAppState extends AppState {
    public LodgingReservations: LodgingReservationsState;
}

export class LodgingReservationsState implements RecordState<LodgingReservation, number> {
    public localPageTypes: StrIndex<StrIndex<LocalPageTypes<number>>> = {};
    public localRecords: StrIndex<StrIndex<LocalObject<LodgingReservation, number>>> = {};
    public availableLodgings: StrIndex<any[]> = {};
}

export function lodgingReservationsReducer(state = new LodgingReservationsState(), action: ReduxAction, prefix: string = 'LODGING_RESERVATIONS_'): LodgingReservationsState {
    switch (action.type) {
        // case this.prefix + LodgingReservationsActions.GET_AVAILABLE_LODGINGS_SUCCESS:
        //     const availableLodgings = {};
        //     availableLodgings[action.meta.key] = action.payload;
        //     return {
        //         ...state,
        //         availableLodgings
        //         // availableLodgings: DictionaryHelpers.mergeDictionaryCollectionImmutable(state.availableLodgings, action.meta.key, action.payload)
        //     };
        // case this.prefix + LodgingReservationsActions.GET_AVAILABLE_LODGINGS_ERROR:
        //     console.log('error:', action);
        //     return { ...state };

        // CHECK IN
        // case this.prefix + LodgingReservationsActions.CHECK_IN_SUCCESS: {
        //     return {
        //         ...state,
        //         // entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // }
        // case this.prefix + LodgingReservationsActions.CHECK_IN_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case this.prefix + LodgingReservationsActions.UNDO_CHECK_IN_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.UNDO_CHECK_IN_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // CANCEL
        // case this.prefix + LodgingReservationsActions.CANCEL_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.CANCEL_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case this.prefix + LodgingReservationsActions.UNDO_CANCEL_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.UNDO_CANCEL_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // CHECK OUT
        // case this.prefix + LodgingReservationsActions.CHECK_OUT_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.CHECK_OUT_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case this.prefix + LodgingReservationsActions.UNDO_CHECK_OUT_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.UNDO_CHECK_OUT_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // MOVE
        // case this.prefix + LodgingReservationsActions.MOVE_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.MOVE_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case this.prefix + LodgingReservationsActions.UNDO_MOVE_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.UNDO_MOVE_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        // NO SHOW
        // case this.prefix + LodgingReservationsActions.NO_SHOW_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.NO_SHOW_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };
        // case this.prefix + LodgingReservationsActions.UNDO_NO_SHOW_SUCCESS:
        //     return {
        //         ...state,
        //         entities: DictionaryHelpers.patchDictionaryImmutable(state.entities, 'success', action, true)
        //     };
        // case this.prefix + LodgingReservationsActions.UNDO_NO_SHOW_ROLLBACK:
        //     console.log('error: ', action);
        //     return { ...state };

        default:
            return {
                ...state,
                ...recordReducersBase<LodgingReservationsState, LodgingReservation, number>(state, action, prefix)
            };
    }
}
