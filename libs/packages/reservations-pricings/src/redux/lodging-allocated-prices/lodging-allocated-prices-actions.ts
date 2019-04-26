import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LodgingAllocatedPricesAppState } from './lodging-allocated-prices-reducer';
import { LODGING_ALLOCATED_PRICES_REDUX_KEY, LODGING_ALLOCATED_PRICES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LodgingAllocatedPrice } from '../../models/lodging-allocated-price';

export class LodgingAllocatedPricesActions extends RecordActionsBase<LodgingAllocatedPricesAppState, Store<LodgingAllocatedPricesAppState>> {

    constructor(protected store: Store<LodgingAllocatedPricesAppState>) { super(store, LODGING_ALLOCATED_PRICES_REDUX_KEY, LODGING_ALLOCATED_PRICES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingAllocatedPrice, number>): StrIndex<string> {
        return {
            id: record.object.change.toString()
        };
    }
}