import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { DoorwayRelationsAppState } from './doorway-relations-reducer';
import { DoorwayRelation, DoorwayRelationKey } from './../models/doorway-relation';
import { DOORWAY_RELATIONS_REDUCER_KEY } from './../constants/constants';
import { DependencyOptions, LocalObject, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    protected getSingleRecord(packagePath: string, id: DoorwayRelationKey): Observable<LocalObject<DoorwayRelation, DoorwayRelationKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => {
                const firstIdMatch = record.object.id.outerDoorwayId === id.outerDoorwayId;
                const secondIdMatch = record.object.id.innerDoorwayId === id.innerDoorwayId;
                return (firstIdMatch && secondIdMatch) ? true : false;
            })),
            hasValue()
        );
    }
}
