import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChangesActions, ProductPriceChange } from '@skysmack/packages-products-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesActions extends ProductPriceChangesActions {
    constructor(protected store: NgRedux<ProductPriceChangesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<ProductPriceChange, number>): StrIndex<string> {
        return {
            dates: `${record.object.validFrom} - ${record.object.validTo}`
        };
    }
}
