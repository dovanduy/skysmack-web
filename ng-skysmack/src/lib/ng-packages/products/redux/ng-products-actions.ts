import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductsAppState } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductsActions extends DocumentRecordActionsBase<ProductsAppState, NgRedux<ProductsAppState>> {
    constructor(protected store: NgRedux<ProductsAppState>) { super(store, 'PRODUCTS_'); }
}
