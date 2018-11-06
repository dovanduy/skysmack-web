import { Person } from '@skysmack/packages-persons';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRecordRequests } from 'lib/ng-redux';

@Injectable({
    providedIn: 'root',
})
export class NgPersonsRequests extends NgRecordRequests<Person, number> {
    protected prefix: 'persons';
    constructor(protected http: HttpClient) {
        super(http);
    }
}
