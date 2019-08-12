import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingReservationsAppState, LodgingReservationsActions, LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsActions extends LodgingReservationsActions {
    constructor(protected store: NgRedux<LodgingReservationsAppState>) { super(store); }

    public getMessageParams(record: LocalObject<LodgingReservation, number>): StrIndex<string> {
        return {
            id: `${record.object.checkIn} - ${record.object.checkOut}`
        };
    }
}
