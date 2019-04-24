import { Epic } from 'redux-observable';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgAccountEpics {
    public epics: Epic[];

    constructor() {
        this.epics = [];
    }
}
