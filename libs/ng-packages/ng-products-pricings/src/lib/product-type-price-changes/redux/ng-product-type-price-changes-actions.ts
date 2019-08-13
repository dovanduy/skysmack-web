import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductTypePriceChangesAppState, ProductTypePriceChangesActions, ProductTypePriceChange } from '@skysmack/packages-products-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesActions extends ProductTypePriceChangesActions {
    constructor(protected store: NgRedux<ProductTypePriceChangesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<ProductTypePriceChange, number>): StrIndex<string> {
        return {
            dates: `${record.object.validFrom} - ${record.object.validTo}`
        };
    }
}
