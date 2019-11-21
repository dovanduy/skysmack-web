import { Injectable } from '@angular/core';
import { NgCorsRequests } from './ng-cors-requests';
import { Epic } from 'redux-observable';

@Injectable({ providedIn: 'root' })
export class CorsEpics {
    public epics: Epic[] = [];

    constructor(protected requests: NgCorsRequests) { }
}
