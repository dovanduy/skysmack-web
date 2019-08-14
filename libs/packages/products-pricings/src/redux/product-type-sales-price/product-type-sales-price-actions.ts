import { RecordActionsBase } from '@skysmack/redux';
import { LocalObject, StrIndex } from '@skysmack/framework';
import { Store } from 'redux';
import { ProductTypeSalesPrice } from '../../models';
import { PRODUCT_TYPE_SALES_PRICE_REDUX_KEY, PRODUCT_TYPE_SALES_PRICE_ADDITIONAL_PATHS } from '../../constants';
import { ProductTypeSalesPriceAppState } from './product-type-sales-price-reducer';

export class ProductTypeSalesPriceActions extends RecordActionsBase<ProductTypeSalesPriceAppState, Store<ProductTypeSalesPriceAppState>> {

    constructor(protected store: Store<ProductTypeSalesPriceAppState>) { super(store, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY, PRODUCT_TYPE_SALES_PRICE_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<ProductTypeSalesPrice, number>): StrIndex<string> {
        return {
        };
    }
}