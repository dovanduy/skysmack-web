import { Injectable } from '@angular/core';
import { OfflineState } from '@redux-offline/redux-offline/lib/types';
import { ReducerRegistry, epic$ } from '@skysmack/redux';

function rootReducer(state: any = {}, action) {
    let newState: any;
    switch (action.type) {
        default:
            return state;
    }
}

ReducerRegistry.Instance.register('rootReducer', rootReducer);

export interface IAppState {
    offline?: OfflineState;
}

@Injectable()
export class RootEpics {
    constructor(
        // public personsEpics: NgPersonsEpics
    ) { }

    // public getEpics = () => combineEpics(
    //     this.personsEpics.getEpics()
    // )
}