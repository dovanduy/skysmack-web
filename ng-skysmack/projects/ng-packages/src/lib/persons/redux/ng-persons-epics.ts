import { NgPersonsRequests } from './ng-persons-requests';
import { Person } from '@skysmack/packages-persons';
import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgPersonsEpics extends DocumentRecordEpicsBase<Person, number> {
    constructor(protected requests: NgPersonsRequests) {
        super(requests, 'PERSONS_');
    }
}
