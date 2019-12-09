import { NgLodgingsDoorwaysRequests } from './ng-lodgings-doorways-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgLodgingsDoorwaysNotifications } from '../ng-lodgings-doorways-notifications';
import { LODGINGS_DOORWAYS_REDUX_KEY } from './../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';


@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysEpics extends RecordEpicsBase<LodgingDoorway, LodgingDoorwayKey> {
    constructor(protected requests: NgLodgingsDoorwaysRequests, protected notifications: NgLodgingsDoorwaysNotifications) {
        super(requests, LODGINGS_DOORWAYS_REDUX_KEY, notifications);
    }
}
