import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { CorsAppState, CORS_REDUCER_KEY } from '@skysmack/packages-cors';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgCorsStore {
    constructor(
        protected ngRedux: NgRedux<CorsAppState>,
        protected skysmackStore: NgSkysmackStore,
        protected stateKey: string = CORS_REDUCER_KEY
    ) { }
}
