import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingPricesAppState, LodgingPricesActions, LodgingPrice } from '@skysmack/packages-reservations-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingPricesActions extends LodgingPricesActions {
    constructor(protected store: NgRedux<LodgingPricesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<LodgingPrice, number>): StrIndex<string> {
        return {
            price: record.object.price.toString()
        };
    }
}
