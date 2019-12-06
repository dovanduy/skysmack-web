import { NgDoorwayRelationsRequests } from './ng-doorway-relations-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase, getReadDependencies } from '@skysmack/ng-framework';
import { DoorwayRelation, DoorwayRelationKey } from '../../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUX_KEY } from '../../constants/constants';
import { NgDoorwayRelationsNotifications } from '../ng-doorway-relations-notifications';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgDoorwaysStore, NgDoorwaysActions } from '../../doorways';


@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsEpics extends RecordEpicsBase<DoorwayRelation, DoorwayRelationKey> {
    constructor(
        protected requests: NgDoorwayRelationsRequests,
        protected notifications: NgDoorwayRelationsNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected doorwaysStore: NgDoorwaysStore,
        protected doorwatsActions: NgDoorwaysActions,
    ) {
        super(requests, DOORWAY_RELATIONS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: DOORWAY_RELATIONS_REDUX_KEY,
                relationIdSelector: 'outerDoorwayId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.doorwaysStore,
                actions: this.doorwatsActions
            }),
            ...getReadDependencies({
                prefix: DOORWAY_RELATIONS_REDUX_KEY,
                relationIdSelector: 'innerDoorwayId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.doorwaysStore,
                actions: this.doorwatsActions
            })
        ]);
    }
}
