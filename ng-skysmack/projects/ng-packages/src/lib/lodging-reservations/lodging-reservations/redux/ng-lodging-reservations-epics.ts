import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-redux';
import { LodgingReservation, LODGING_RESERVATIONS_REDUX_KEY } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsRequests } from './ng-lodging-reservations-requests';
import { Injectable } from '@angular/core';
import { NgLodgingTypesActions } from '../../../lodgings/lodging-types/redux/ng-lodging-types-actions';
import { NgSkysmackStore } from '../../../skysmack-core/skysmack/redux/ng-skysmack-store';
import { NgLodgingsActions } from '../../../lodgings/lodgings/redux/ng-lodgings-actions';
import { NgLodgingReservationsNotifications } from '../ng-lodging-reservations-notifications';
import { NgLodgingTypesStore } from '../../../lodgings/lodging-types/redux/ng-lodgings-types-store';
import { NgLodgingsStore } from '../../../lodgings/lodgings/redux/ng-lodgings-store';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsEpics extends RecordEpicsBase<LodgingReservation, number> {
    constructor(
        protected requests: NgLodgingReservationsRequests,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingTypesStore: NgLodgingTypesStore,
        protected lodgingTypesActions: NgLodgingTypesActions,
        protected lodgingsActions: NgLodgingsActions,
        protected lodgingsStore: NgLodgingsStore,
        protected notifications: NgLodgingReservationsNotifications
    ) {
        super(requests, LODGING_RESERVATIONS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_RESERVATIONS_REDUX_KEY,
                relationIdSelector: 'lodgingTypeId',
                relationSelector: 'lodgingType',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingTypesStore,
                actions: this.lodgingTypesActions,
                packageDependencyIndex: 0
            }),
            ...getReadDependencies({
                prefix: LODGING_RESERVATIONS_REDUX_KEY,
                relationIdSelector: 'allocatedLodgingId',
                relationSelector: 'allocatedLodging',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingsStore,
                actions: this.lodgingsActions,
                packageDependencyIndex: 0
            })
        ]);
    }
}
