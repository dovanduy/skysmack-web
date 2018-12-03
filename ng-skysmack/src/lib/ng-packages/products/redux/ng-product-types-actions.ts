import { DocumentRecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductTypesAppState } from '@skysmack/packages-products';

@Injectable({ providedIn: 'root' })
export class NgProductTypesActions extends DocumentRecordActionsBase<ProductTypesAppState, NgRedux<ProductTypesAppState>> {
    constructor(protected store: NgRedux<ProductTypesAppState>) { super(store, 'PRODUCT_TYPES_', ['types']); }
}
