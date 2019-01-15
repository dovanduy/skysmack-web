import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { Lodging } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingsRequests } from './ng-lodgings-requests';

@Injectable({ providedIn: 'root' })
export class NgLodgingsEpics extends DocumentRecordEpicsBase<Lodging, number> {
    constructor(protected requests: NgLodgingsRequests) {
        super(requests, 'LODGINGS_');
    }
}
