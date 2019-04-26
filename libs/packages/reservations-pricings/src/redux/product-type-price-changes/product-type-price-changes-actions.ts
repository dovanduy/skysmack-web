import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { ProductTypePriceChange } from '../../models';
import { PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, PRODUCT_TYPE_PRICE_CHANGES_ADDITIONAL_PATHS } from '../../constants/constants';
import { ProductTypePriceChangesAppState } from './product-type-price-changes-reducer';

export class ProductTypePriceChangesActions extends RecordActionsBase<ProductTypePriceChangesAppState, Store<ProductTypePriceChangesAppState>> {

    constructor(protected store: Store<ProductTypePriceChangesAppState>) { super(store, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, PRODUCT_TYPE_PRICE_CHANGES_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<ProductTypePriceChange, number>): StrIndex<string> {
        return {
            id: record.object.change.toString()
        };
    }
}