import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductsAppState } from '@skysmack/packages-products';
import { NumIndex, LocalObject } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductsActions extends DocumentRecordActionsBase<ProductsAppState, NgRedux<ProductsAppState>> {
    constructor(protected store: NgRedux<ProductsAppState>) { super(store, 'PRODUCTS_', []); }

    protected getMessageParams(record: LocalObject<any, number>): NumIndex<string> {
        return {};
    }
}
