import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingType } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingTypesRequests } from './ng-lodging-types-requests';
import { NgLodgingTypesNotifications } from '../ng-lodging-types-notifications';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesEpics extends RecordEpicsBase<LodgingType, number> {
    constructor(protected requests: NgLodgingTypesRequests, protected notifications: NgLodgingTypesNotifications) {
        super(requests, 'LODGING_TYPES_', notifications);
    }
}