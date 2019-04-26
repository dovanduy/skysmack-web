import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LODGING_PRICES_REDUX_KEY, LODGING_PRICES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LodgingPrice } from '../../models/lodging-price';
import { LodgingPricesAppState } from './lodging-prices-reducer';

export class LodgingPricesActions extends RecordActionsBase<LodgingPricesAppState, Store<LodgingPricesAppState>> {

    constructor(protected store: Store<LodgingPricesAppState>) { super(store, LODGING_PRICES_REDUX_KEY, LODGING_PRICES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingPrice, number>): StrIndex<string> {
        return {
            id: record.object.currencyCode.toString()
        };
    }
}