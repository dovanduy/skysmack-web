import { Definition, DEFINITIONS_REDUX_KEY } from '@skysmack/packages-workflows';
import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Injectable } from '@angular/core';
import { NgDefinitionsRequests } from './ng-definitions-requests';
import { NgDefinitionsNotifications } from '../ng-definitions-notifications';

@Injectable({ providedIn: 'root' })
export class DefinitionsEpics extends RecordEpicsBase<Definition, number> {
    constructor(protected requests: NgDefinitionsRequests, protected notifications: NgDefinitionsNotifications) {
        super(requests, DEFINITIONS_REDUX_KEY, notifications);
    }
}
