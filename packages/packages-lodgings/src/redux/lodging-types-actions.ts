import { RecordActionsBase, ReduxAction, GetIntervalPayload } from '@skysmack/redux';
import { Store } from 'redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { SelectedLodgingIdsMeta } from '../metas/selected-lodging-ids-meta';
import { LodgingTypesAppState } from './lodging-types-reducer';
import { LodgingType } from '../models/lodging-type';

export class LodgingTypesActions extends RecordActionsBase<LodgingTypesAppState, Store<LodgingTypesAppState>> {
    public static GET_AVAILABLE_LODGINGS = 'GET_AVAILABLE_LODGINGS';
    public static GET_AVAILABLE_LODGINGS_SUCCESS = 'GET_AVAILABLE_LODGINGS_SUCCESS';
    public static GET_AVAILABLE_LODGINGS_FAILURE = 'GET_AVAILABLE_LODGINGS_FAILURE';

    constructor(protected store: Store<LodgingTypesAppState>) { super(store, 'LODGING_TYPES_', ['types']); }

    public getAvailableLodgings(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedLodgingIdsMeta>({
            type: LodgingTypesActions.GET_AVAILABLE_LODGINGS,
            payload: {
                packagePath,
                start,
                end
            },
            meta: {
                lodgingIds: selectedLodgingIds
            }
        })));
    }

    public getMessageParams(record: LocalObject<LodgingType, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}