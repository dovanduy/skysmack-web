import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwaysOptionsAppState } from './doorways-options-reducer';
import { DoorwayOption } from './../models/doorway-option';
import { DOORWAYS_OPTIONS_REDUCER_KEY } from './../constants/constants';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysOptionsStore extends NgRecordStore<DoorwaysOptionsAppState, DoorwayOption, number> {
    constructor(
        protected ngRedux: NgRedux<DoorwaysOptionsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DOORWAYS_OPTIONS_REDUCER_KEY); }
}
