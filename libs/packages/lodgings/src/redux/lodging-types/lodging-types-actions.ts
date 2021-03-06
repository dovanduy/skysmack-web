import { RecordActionsBase, ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { Store } from 'redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { LodgingTypesAppState } from './lodging-types-reducer';
import { LodgingType } from '../../models/lodging-type';
import { LODGING_TYPES_REDUX_KEY, LODGING_TYPES_ADDITIONAL_PATHS } from '../../constants';

export class LodgingTypesActions extends RecordActionsBase<LodgingTypesAppState, Store<LodgingTypesAppState>> {
    public static GET_AVAILABLE_LODGING_TYPES = 'GET_AVAILABLE_LODGING_TYPES';
    public static GET_AVAILABLE_LODGING_TYPES_SUCCESS = 'GET_AVAILABLE_LODGING_TYPES_SUCCESS';
    public static GET_AVAILABLE_LODGING_TYPES_FAILURE = 'GET_AVAILABLE_LODGING_TYPES_FAILURE';

    public static GET_AVAILABLE_LODGING_TYPES_COUNT = 'GET_AVAILABLE_LODGING_TYPES_COUNT';
    public static GET_AVAILABLE_LODGING_TYPES_COUNT_SUCCESS = 'GET_AVAILABLE_LODGING_TYPES_COUNT_SUCCESS';
    public static GET_AVAILABLE_LODGING_TYPES_COUNT_FAILURE = 'GET_AVAILABLE_LODGING_TYPES_COUNT_FAILURE';

    public static GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT = 'GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT';
    public static GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT_SUCCESS = 'GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT_SUCCESS';
    public static GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT_FAILURE = 'GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT_FAILURE';

    constructor(protected store: Store<LodgingTypesAppState>) { super(store, LODGING_TYPES_REDUX_KEY, LODGING_TYPES_ADDITIONAL_PATHS); }

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

    public getAvailableLodgingTypesCount(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>({
            type: LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_COUNT,
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

    public getAvailableLodgingTypesDailyCount(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>({
            type: LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_DAILY_COUNT,
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