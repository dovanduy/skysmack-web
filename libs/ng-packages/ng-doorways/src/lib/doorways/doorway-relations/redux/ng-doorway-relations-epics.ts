import { NgDoorwayRelationsRequests } from './ng-doorway-relations-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { DoorwayRelation, DoorwayRelationKey } from '../../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUX_KEY } from '../../constants/constants';
import { NgDoorwayRelationsNotifications } from '../ng-doorway-relations-notifications';


@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsEpics extends RecordEpicsBase<DoorwayRelation, DoorwayRelationKey> {
    constructor(protected requests: NgDoorwayRelationsRequests, protected notifications: NgDoorwayRelationsNotifications) {
        super(requests, DOORWAY_RELATIONS_REDUX_KEY, notifications);
    }
}
