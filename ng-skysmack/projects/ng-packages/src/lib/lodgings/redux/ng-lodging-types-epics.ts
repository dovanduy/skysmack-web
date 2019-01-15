import { NgLodgingsRequests } from './ng-lodgings-requests';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingType } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesEpics extends DocumentRecordEpicsBase<LodgingType, number> {
    constructor(protected requests: NgLodgingsRequests) {
        super(requests, 'LODGING_TYPES_');
    }
}