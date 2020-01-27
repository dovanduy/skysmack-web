import { NgDoorwaysOptionsRequests } from './ng-doorways-options-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgDoorwaysOptionsNotifications } from '../ng-doorways-options-notifications';
import { DoorwayOption } from './../models/doorway-option';
import { DOORWAYS_OPTIONS_REDUX_KEY } from './../constants/constants';


@Injectable({ providedIn: 'root' })
export class NgDoorwaysOptionsEpics extends RecordEpicsBase<DoorwayOption, number> {
    constructor(protected requests: NgDoorwaysOptionsRequests, protected notifications: NgDoorwaysOptionsNotifications) {
        super(requests, DOORWAYS_OPTIONS_REDUX_KEY, notifications);
    }
}
