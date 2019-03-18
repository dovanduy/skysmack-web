import { RecordActionsBase, ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { Store } from 'redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { LodgingTypesAppState } from './lodging-types-reducer';
import { LodgingType } from '../models/lodging-type';

export class LodgingTypesActions extends RecordActionsBase<LodgingTypesAppState, Store<LodgingTypesAppState>> {
    public static GET_AVAILABLE_LODGING_TYPES = 'GET_AVAILABLE_LODGING_TYPES';
    public static GET_AVAILABLE_LODGING_TYPES_SUCCESS = 'GET_AVAILABLE_LODGING_TYPES_SUCCESS';
    public static GET_AVAILABLE_LODGING_TYPES_FAILURE = 'GET_AVAILABLE_LODGING_TYPES_FAILURE';

    constructor(protected store: Store<LodgingTypesAppState>) { super(store, 'LODGING_TYPES_', ['types']); }

    public getAvailableLodgingTypes(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>({
            type: LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES,
            payload: {
                packagePath,
                start,
                end
            },
            meta: {
                ids: selectedLodgingIds
            }
        })));
    }

    public getMessageParams(record: LocalObject<LodgingType, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}