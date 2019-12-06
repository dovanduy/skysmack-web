import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwaysPassCodesAppState } from './doorways-pass-codes-reducer';
import { DoorwayPassCode, DoorwayPassCodeKey } from './../models/doorway-pass-code';
import { DOORWAYS_PASS_CODES_REDUCER_KEY } from './../constants/constants';

@Injectable({ providedIn: 'root' })
export class NgDoorwaysPassCodesStore extends NgRecordStore<DoorwaysPassCodesAppState, DoorwayPassCode, DoorwayPassCodeKey> {
    constructor(
        protected ngRedux: NgRedux<DoorwaysPassCodesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DOORWAYS_PASS_CODES_REDUCER_KEY); }
}
