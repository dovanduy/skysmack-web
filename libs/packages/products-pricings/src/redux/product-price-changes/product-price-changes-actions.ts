import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { ProductPriceChange } from '../../models';
import { PRODUCT_PRICE_CHANGES_REDUX_KEY, PRODUCT_PRICE_CHANGES_ADDITIONAL_PATHS } from '../../constants/constants';
import { ProductPriceChangesAppState } from './product-price-changes-reducer';

export class ProductPriceChangesActions extends RecordActionsBase<ProductPriceChangesAppState, Store<ProductPriceChangesAppState>> {

    constructor(protected store: Store<ProductPriceChangesAppState>) { super(store, PRODUCT_PRICE_CHANGES_REDUX_KEY, PRODUCT_PRICE_CHANGES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<ProductPriceChange, number>): StrIndex<string> {
        return {
        };
    }
}