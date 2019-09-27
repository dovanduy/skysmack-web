import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { GroupReservationsAppState, GroupReservationsActions } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgGroupReservationsActions extends GroupReservationsActions {
    constructor(protected store: NgRedux<GroupReservationsAppState>) { super(store); }
}
