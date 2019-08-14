import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { LODGING_TYPE_PRICES_REDUX_KEY, LODGING_TYPE_PRICES_ADDITIONAL_PATHS } from '../../constants/constants';
import { LodgingTypePricesAppState } from './lodging-type-prices-reducer';
import { LodgingTypePrice } from '../../models/lodging-type-price';

export class LodgingTypePricesActions extends RecordActionsBase<LodgingTypePricesAppState, Store<LodgingTypePricesAppState>> {

    constructor(protected store: Store<LodgingTypePricesAppState>) { super(store, LODGING_TYPE_PRICES_REDUX_KEY, LODGING_TYPE_PRICES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<LodgingTypePrice, number>): StrIndex<string> {
        return {
        };
    }
}