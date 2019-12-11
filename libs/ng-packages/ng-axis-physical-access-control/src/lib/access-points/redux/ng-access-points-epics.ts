import { NgAccessPointsRequests } from './ng-access-points-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { NgAccessPointsNotifications } from '../ng-access-points-notifications';
import { ACCESS_POINTS_REDUX_KEY } from './../constants/constants';
import { AccessPoint, } from '../models/access-point';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgDoorwaysStore, NgDoorwaysActions } from '@skysmack/ng-doorways';


@Injectable({ providedIn: 'root' })
export class NgAccessPointsEpics extends RecordEpicsBase<AccessPoint, string> {
    constructor(
        protected requests: NgAccessPointsRequests,
        protected notifications: NgAccessPointsNotifications,
        private doorwaysStore: NgDoorwaysStore,
        private doorwaysActions: NgDoorwaysActions,
        private skysmackStore: NgSkysmackStore
    ) {
        super(requests, ACCESS_POINTS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: ACCESS_POINTS_REDUX_KEY,
                relationIdSelector: 'doorwayId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.doorwaysStore,
                actions: this.doorwaysActions,
                dependencyIndexes: [0]
            })
        ]);
    }
}
