import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Lodging } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingsRequests } from './ng-lodgings-requests';
import { NgLodgingsNotifications } from '../ng-lodgings-notifications';

@Injectable({ providedIn: 'root' })
export class NgLodgingsEpics extends RecordEpicsBase<Lodging, number> {
    constructor(protected requests: NgLodgingsRequests, protected notifications: NgLodgingsNotifications) {
        super(requests, 'LODGINGS_', notifications);
    }
}
