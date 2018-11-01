import { NgRecordRequests } from '@skysmack/ng-redux';
import { Person } from '@skysmack/packages-persons';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PersonsRequests extends NgRecordRequests<Person, number> {
    protected prefix: 'persons';
    constructor(protected http: HttpClient) {
        super(http);
    }
}
