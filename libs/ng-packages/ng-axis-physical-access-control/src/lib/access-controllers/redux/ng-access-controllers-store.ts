import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AccessControllersAppState } from './access-controllers-reducer';
import { ACCESS_CONTROLLERS_REDUCER_KEY } from './../constants/constants';
import { AccessController, } from '../models/access-controller';

@Injectable({ providedIn: 'root' })
export class NgAccessControllersStore extends NgRecordStore<AccessControllersAppState, AccessController, string> {
    constructor(
        protected ngRedux: NgRedux<AccessControllersAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ACCESS_CONTROLLERS_REDUCER_KEY); }
}
