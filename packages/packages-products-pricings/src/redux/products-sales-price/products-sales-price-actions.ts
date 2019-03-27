import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { ProductsSalesPrice } from '../../models';
import { ProductsSalesPriceAppState } from './products-sales-price-reducer';
import { PRODUCTS_SALES_PRICE_REDUX_KEY, PRODUCTS_SALES_PRICE_ADDITIONAL_PATHS } from '../../constants/constants';

export class ProductsSalesPriceActions extends RecordActionsBase<ProductsSalesPriceAppState, Store<ProductsSalesPriceAppState>> {

    constructor(protected store: Store<ProductsSalesPriceAppState>) { super(store, PRODUCTS_SALES_PRICE_REDUX_KEY, PRODUCTS_SALES_PRICE_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<ProductsSalesPrice, number>): StrIndex<string> {
        return {
            id: record.object.price.toString()
        };
    }
}