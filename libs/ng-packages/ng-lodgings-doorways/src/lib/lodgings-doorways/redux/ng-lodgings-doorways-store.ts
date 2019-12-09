import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingsDoorwaysAppState } from './lodgings-doorways-reducer';
import { LODGINGS_DOORWAYS_REDUCER_KEY } from './../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysStore extends NgRecordStore<LodgingsDoorwaysAppState, LodgingDoorway, LodgingDoorwayKey> {
    constructor(
        protected ngRedux: NgRedux<LodgingsDoorwaysAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGINGS_DOORWAYS_REDUCER_KEY); }
}
