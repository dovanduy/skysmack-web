import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';
import { NgSiteMinderChannelManagerRequests } from './ng-siteminder-channel-manager-requests';


@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerEpics {
    public epics: Epic[] = [];
    constructor(protected requests: NgSiteMinderChannelManagerRequests) {
    }
}
