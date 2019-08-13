import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChangesActions, LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesActions extends LodgingTypeReservationPriceChangesActions {
    constructor(protected store: NgRedux<LodgingTypeReservationPriceChangesAppState>) { super(store); }

    public getMessageParams(record: LocalObject<LodgingTypeReservationPriceChange, number>): StrIndex<string> {
        return {
            dates: `${record.object.validFrom} - ${record.object.validTo}`
        };
    }
}
