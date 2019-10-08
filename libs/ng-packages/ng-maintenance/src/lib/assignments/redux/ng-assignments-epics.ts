import { Injectable } from '@angular/core';
import { Epic } from 'redux-observable';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics {
    public epics: Epic[];
    constructor(
    ) {
        this.epics = [];
    }
}