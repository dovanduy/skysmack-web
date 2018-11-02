import { Injectable } from '@angular/core';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { personsReducer, PersonsState } from 'packages/persons/redux/persons-reducer';
import { NgPersonsEpics } from 'packages/persons/redux/ng-persons-epics';
import { OfflineState } from '@redux-offline/redux-offline/lib/types';

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
    offline?: OfflineState;
    persons?: PersonsState;
}

export const appReducer = combineReducers({
    persons: personsReducer
});

@Injectable()
export class RootEpics {
    constructor(
        public personsEpics: NgPersonsEpics
    ) { }

    public getEpics = () => combineEpics(
        this.personsEpics.getEpics()
    )
}