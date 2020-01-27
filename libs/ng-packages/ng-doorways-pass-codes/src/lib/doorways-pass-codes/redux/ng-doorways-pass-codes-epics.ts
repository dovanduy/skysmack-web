import { NgDoorwaysPassCodesRequests } from './ng-doorways-pass-codes-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgDoorwaysPassCodesNotifications } from '../ng-doorways-pass-codes-notifications';
import { DoorwayPassCode, DoorwayPassCodeKey } from './../models/doorway-pass-code';
import { DOORWAYS_PASS_CODES_REDUX_KEY } from './../constants/constants';


@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesEpics extends RecordEpicsBase<DoorwayPassCode, DoorwayPassCodeKey> {
    constructor(protected requests: NgDoorwaysPassCodesRequests, protected notifications: NgDoorwaysPassCodesNotifications) {
        super(requests, DOORWAYS_PASS_CODES_REDUX_KEY, notifications);
    }
}
