import { NgSiteMinderRequests } from './ng-siteminder-requests';
import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';


@Injectable({ providedIn: 'root' })
export class NgSiteMinderEpics {
    public epics: Epic[] = [];
    constructor(protected requests: NgSiteMinderRequests) {
    }
}
