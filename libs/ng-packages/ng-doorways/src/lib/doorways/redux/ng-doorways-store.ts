import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwaysAppState } from './doorways-reducer';
import { DOORWAYS_REDUCER_KEY } from './../constants/constants';
import { Doorway } from '../models/doorway';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysStore extends NgRecordStore<DoorwaysAppState, Doorway, number> {
    constructor(
        protected ngRedux: NgRedux<DoorwaysAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DOORWAYS_REDUCER_KEY); }
}
