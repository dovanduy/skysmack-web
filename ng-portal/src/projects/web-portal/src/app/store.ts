import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable';
import { NgPersonsEpics } from 'packages/persons/redux/ng-persons-epics';
import { OfflineState } from '@redux-offline/redux-offline/lib/types';
import { ReducerRegistry } from '@skysmack/redux';

function rootReducer(state: any = {}, action) {
    let newState: any;
    switch (action.type) {
        default:
            return state;
    }
}

// EXPERIMENTAL
const reducerRegistry = ReducerRegistry.Instance;
reducerRegistry.register('rootReducer', rootReducer);

export interface IAppState {
    offline?: OfflineState;
}

@Injectable()
export class RootEpics {
    constructor(
        public personsEpics: NgPersonsEpics
    ) { }

    public getEpics = () => combineEpics(
        this.personsEpics.getEpics()
    )
}