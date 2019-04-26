import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LodgingTypeAllocatedPrice } from '../../models/lodging-type-allocated-price';
import { LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY, LODGING_TYPE_ALLOCATED_PRICES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LodgingTypeAllocatedPricesAppState } from './lodging-type-allocated-prices-reducer';

export class LodgingTypeAllocatedPricesActions extends RecordActionsBase<LodgingTypeAllocatedPricesAppState, Store<LodgingTypeAllocatedPricesAppState>> {

    constructor(protected store: Store<LodgingTypeAllocatedPricesAppState>) { super(store, LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY, LODGING_TYPE_ALLOCATED_PRICES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypeAllocatedPrice, number>): StrIndex<string> {
        return {
            id: record.object.change.toString()
        };
    }
}