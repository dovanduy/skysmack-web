import { RecordActionsBase, ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { Store } from 'redux';
import { LodgingsAppState } from './lodgings-reducer';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Lodging } from '../models/lodging';


export class LodgingsActions extends RecordActionsBase<LodgingsAppState, Store<LodgingsAppState>> {
    public static GET_AVAILABLE_LODGINGS = 'GET_AVAILABLE_LODGINGS';
    public static GET_AVAILABLE_LODGINGS_SUCCESS = 'GET_AVAILABLE_LODGINGS_SUCCESS';
    public static GET_AVAILABLE_LODGINGS_FAILURE = 'GET_AVAILABLE_LODGINGS_FAILURE';

    constructor(protected store: Store<LodgingsAppState>) { super(store, 'LODGINGS_', []); }

    public getAvailableLodgings(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedIdsMeta>({
            type: LodgingsActions.GET_AVAILABLE_LODGINGS,
            payload: {
                packagePath,
                start,
                end
            },
            meta: {
                ids: selectedLodgingIds
            }
        })))
    }

    public getMessageParams(record: LocalObject<Lodging, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}