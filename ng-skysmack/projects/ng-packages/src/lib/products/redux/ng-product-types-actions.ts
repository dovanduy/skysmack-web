import { RecordActionsBase } from '@skysmack/redux';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { LocalObject, NumIndex, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductTypesActions extends RecordActionsBase<ProductTypesAppState, NgRedux<ProductTypesAppState>> {
    constructor(protected store: NgRedux<ProductTypesAppState>) { super(store, 'PRODUCT_TYPES_', ['types']); }

    public getMessageParams(record: LocalObject<ProductType, number>): StrIndex<string> {
        return {
            name: record.object.name
        };
    }
}
