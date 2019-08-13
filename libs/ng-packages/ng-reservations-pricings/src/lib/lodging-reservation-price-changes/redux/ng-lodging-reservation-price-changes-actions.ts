import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingReservationPriceChangesAppState, LodgingReservationPriceChangesActions, LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesActions extends LodgingReservationPriceChangesActions {
    constructor(protected store: NgRedux<LodgingReservationPriceChangesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<LodgingReservationPriceChange, number>): StrIndex<string> {
        return {
            dates: `${record.object.validFrom} - ${record.object.validTo}`
        };
    }
}
