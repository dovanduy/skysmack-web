import { NgAccessControllersRequests } from './ng-access-controllers-requests';
import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { NgAccessControllersNotifications } from '../ng-access-controllers-notifications';
import { ACCESS_CONTROLLERS_REDUX_KEY } from './../constants/constants';
import { AccessController, } from '../models/access-controller';

@Injectable({ providedIn: 'root' })
export class NgAccessControllersEpics extends RecordEpicsBase<AccessController, string> {
    constructor(
        protected requests: NgAccessControllersRequests,
        protected notifications: NgAccessControllersNotifications
    ) {
        super(requests, ACCESS_CONTROLLERS_REDUX_KEY, notifications);
    }
}