import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingReservationsAppState, LodgingReservationsActions, LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { LocalObject, NumIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsActions extends LodgingReservationsActions {
    constructor(protected store: NgRedux<LodgingReservationsAppState>) { super(store); }

    protected getMessageParams(record: LocalObject<LodgingReservation, number>): NumIndex<string> {
        return {
            0: 'Lodging reservation ' + record.object.id
        };
    }
}
