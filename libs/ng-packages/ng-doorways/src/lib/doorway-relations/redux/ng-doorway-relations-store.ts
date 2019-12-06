import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwayRelationsAppState } from './doorway-relations-reducer';
import { DoorwayRelation, DoorwayRelationKey } from './../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUCER_KEY } from './../constants/constants';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgDoorwayRelationsStore extends NgRecordStore<DoorwayRelationsAppState, DoorwayRelation, DoorwayRelationKey> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'innerDoorway',
            relationIdSelector: 'innerDoorwayId',
            stateSelector: 'doorways'
        }),
        new DependencyOptions({
            relationSelector: 'outerDoorway',
            relationIdSelector: 'outerDoorwayId',
            stateSelector: 'doorways'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<DoorwayRelationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, DOORWAY_RELATIONS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<DoorwayRelation, DoorwayRelationKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: DoorwayRelation): Observable<LocalObject<DoorwayRelation, DoorwayRelationKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
