import { ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { Store } from 'redux';
import { LodgingsAppState } from './lodgings-reducer';

export class LodgingsAvailabilityActions {
    public static GET_AVAILABLE_LODGINGS = 'GET_AVAILABLE_LODGINGS';
    public static GET_AVAILABLE_LODGINGS_SUCCESS = 'GET_AVAILABLE_LODGINGS_SUCCESS';
    public static GET_AVAILABLE_LODGINGS_FAILURE = 'GET_AVAILABLE_LODGINGS_FAILURE';

    public static GET_AVAILABLE_LODGINGS_DAILY = 'GET_AVAILABLE_LODGINGS_DAILY';
    public static GET_AVAILABLE_LODGINGS_DAILY_SUCCESS = 'GET_AVAILABLE_LODGINGS_DAILY_SUCCESS';
    public static GET_AVAILABLE_LODGINGS_DAILY_FAILURE = 'GET_AVAILABLE_LODGINGS_DAILY_FAILURE';

    constructor(protected store: Store<LodgingsAppState>) { }

    public getAvailableLodgings(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>({
            type: LodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS,
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

    public getAvailableLodgingsDaily(packagePath: string, start: string, end: string, selectedLodgingIds: number[]) {
        this.store.dispatch(Object.assign({}, new ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>({
            type: LodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_DAILY,
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
}