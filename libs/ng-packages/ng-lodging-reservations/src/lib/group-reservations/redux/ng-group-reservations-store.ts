import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { GroupReservationsAppState, GroupReservation, GROUP_RESERVATIONS_REDUCER_KEY } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgGroupReservationsStore extends NgRecordStore<GroupReservationsAppState, GroupReservation, number> {
    constructor(
        protected ngRedux: NgRedux<GroupReservationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, GROUP_RESERVATIONS_REDUCER_KEY); }
}
