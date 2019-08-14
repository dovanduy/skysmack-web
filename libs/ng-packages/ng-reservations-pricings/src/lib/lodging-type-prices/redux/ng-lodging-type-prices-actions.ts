import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypePricesAppState, LodgingTypePricesActions, LodgingTypePrice } from '@skysmack/packages-reservations-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesActions extends LodgingTypePricesActions {
    constructor(protected store: NgRedux<LodgingTypePricesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<LodgingTypePrice, number>): StrIndex<string> {
        return {
        };
    }
}
