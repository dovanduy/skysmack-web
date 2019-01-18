import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingType } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingTypesRequests } from './ng-lodging-types-requests';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesEpics extends DocumentRecordEpicsBase<LodgingType, number> {
    constructor(protected requests: NgLodgingTypesRequests) {
        super(requests, 'LODGING_TYPES_');
    }
}