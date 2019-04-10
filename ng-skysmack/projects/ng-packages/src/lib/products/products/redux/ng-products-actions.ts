import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductsAppState, Product, PRODUCTS_REDUX_KEY, PRODUCTS_ADDITIONAL_PATHS } from '@skysmack/packages-products';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductsActions extends RecordActionsBase<ProductsAppState, NgRedux<ProductsAppState>> {
    constructor(protected store: NgRedux<ProductsAppState>) { super(store, PRODUCTS_REDUX_KEY, PRODUCTS_ADDITIONAL_PATHS); }

    public getMessageParams(record: LocalObject<Product, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
