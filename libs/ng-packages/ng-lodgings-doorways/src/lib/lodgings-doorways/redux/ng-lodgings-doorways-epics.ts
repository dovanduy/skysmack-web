import { NgLodgingsDoorwaysRequests } from './ng-lodgings-doorways-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { NgLodgingsDoorwaysNotifications } from '../ng-lodgings-doorways-notifications';
import { LODGINGS_DOORWAYS_REDUX_KEY } from './../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';


@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysEpics extends RecordEpicsBase<LodgingDoorway, LodgingDoorwayKey> {
    constructor(
        protected requests: NgLodgingsDoorwaysRequests,
        protected notifications: NgLodgingsDoorwaysNotifications,
        private lodgingsStore: NgLodgingsStore,
        private lodgingsActions: NgLodgingsActions,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private skysmackStore: NgSkysmackStore
    ) {
        super(requests, LODGINGS_DOORWAYS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGINGS_DOORWAYS_REDUX_KEY,
                relationIdSelector: 'lodgingId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingsStore,
                actions: this.lodgingsActions,
                dependencyIndexes: [0]
            }),
            ...getReadDependencies({
                prefix: LODGINGS_DOORWAYS_REDUX_KEY,
                relationIdSelector: 'doorwayId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.doorwaysStore,
                actions: this.doorwaysActions,
                dependencyIndexes: [1]
            })
        ]);
    }
}
