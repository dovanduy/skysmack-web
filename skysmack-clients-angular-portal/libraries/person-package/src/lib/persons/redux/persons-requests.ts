
import { Injectable } from '@angular/core';
import { Person } from 'skysmack-packages-persons';
import { NgRecordRequests } from 'skysmack-redux-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PersonsRequests extends NgRecordRequests<Person, number> {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    protected prefix = 'persons';
}
