import { Injectable } from '@angular/core';
// import { NgPersonsEpics } from 'person-package/lib/persons/redux/ng-persons-epics';
import { createStore, Store, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

export function rootReducer(state: any, action) {
    let newState: any;
    switch (action.type) {
        default:
            newState = state;
            break;
    }

    return appReducer(newState, action);
}

export interface IAppState {
    // General
    // persons?: PersonsState;
}

export const appReducer = combineReducers({
    // persons: personsReducer
} as any);

@Injectable()
export class RootEpics {
    constructor(
        // Packages
        // public personsEpics: NgPersonsEpics
    ) { }

    public getEpics = () => combineEpics(
        // General
        // this.personsEpics.getEpics(),
    )
}