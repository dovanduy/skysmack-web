import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwayRelationsAppState } from './doorway-relations-reducer';
import { DoorwayRelation, DoorwayRelationKey } from '../../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUCER_KEY } from '../../constants/constants';

@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsStore extends NgRecordStore<DoorwayRelationsAppState, DoorwayRelation, DoorwayRelationKey> {
    constructor(
        protected ngRedux: NgRedux<DoorwayRelationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DOORWAY_RELATIONS_REDUCER_KEY); }
}
