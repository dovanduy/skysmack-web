import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPriceActions, ProductTypeSalesPrice } from '@skysmack/packages-products-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceActions extends ProductTypeSalesPriceActions {
    constructor(protected store: NgRedux<ProductTypeSalesPriceAppState>) { super(store); }

    public getMessageParams(record: LocalObject<ProductTypeSalesPrice, number>): StrIndex<string> {
        return {
            price: record.object.price.toString()
        };
    }
}
