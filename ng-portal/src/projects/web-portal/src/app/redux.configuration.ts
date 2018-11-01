import { Injectable } from '@angular/core';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { personsReducer, PersonsState } from 'packages/persons/redux/persons-reducer';
import { NgPersonsEpics } from 'packages/persons/redux/ng-persons-epics';

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
    persons?: PersonsState;
}

export const appReducer = combineReducers({
    persons: personsReducer
});

@Injectable({ providedIn: 'root' })
export class RootEpics {
    constructor(
        public personsEpics: NgPersonsEpics
    ) { }

    public getEpics = () => combineEpics(
        this.personsEpics.getEpics()
    )
}