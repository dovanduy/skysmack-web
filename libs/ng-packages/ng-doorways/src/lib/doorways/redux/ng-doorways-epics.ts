import { NgDoorwaysRequests } from './ng-doorways-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgDoorwaysNotifications } from '../ng-doorways-notifications';
import { DOORWAYS_REDUX_KEY } from './../constants/constants';
import { Doorway } from '../models/doorway';


@Injectable({ providedIn: 'root' })
export class NgDoorwaysEpics extends RecordEpicsBase<Doorway, number> {
    constructor(protected requests: NgDoorwaysRequests, protected notifications: NgDoorwaysNotifications) {
        super(requests, DOORWAYS_REDUX_KEY, notifications);
    }
}
