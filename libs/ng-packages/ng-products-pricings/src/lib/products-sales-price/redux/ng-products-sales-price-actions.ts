import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductsSalesPriceAppState, ProductsSalesPriceActions, ProductsSalesPrice } from '@skysmack/packages-products-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceActions extends ProductsSalesPriceActions {
    constructor(protected store: NgRedux<ProductsSalesPriceAppState>) { super(store); }

    public getMessageParams(record: LocalObject<ProductsSalesPrice, number>): StrIndex<string> {
        return {
            price: record.object.price.toString()
        };
    }
}
