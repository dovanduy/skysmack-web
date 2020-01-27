import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { LodgingsDoorwaysAppState } from './lodgings-doorways-reducer';
import { LODGINGS_DOORWAYS_REDUCER_KEY } from './../constants/constants';
import { LodgingDoorway, LodgingDoorwayKey } from '../models/lodging-doorway';
import { DependencyOptions, LocalObject, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingsDoorwaysStore extends NgRecordStore<LodgingsDoorwaysAppState, LodgingDoorway, LodgingDoorwayKey> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'lodging',
            relationIdSelector: 'lodgingId',
            stateSelector: 'lodgings',
            dependencyIndexes: [0]
        }),
        new DependencyOptions({
            relationSelector: 'doorway',
            relationIdSelector: 'doorwayId',
            stateSelector: 'doorways',
            dependencyIndexes: [1]
        })
    ];

    constructor(
        protected ngRedux: NgRedux<LodgingsDoorwaysAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGINGS_DOORWAYS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<LodgingDoorway, LodgingDoorwayKey>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: LodgingDoorwayKey): Observable<LocalObject<LodgingDoorway, LodgingDoorwayKey>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }

    protected getSingleRecord(packagePath: string, id: LodgingDoorwayKey): Observable<LocalObject<LodgingDoorway, LodgingDoorwayKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => {
                const firstIdMatch = record.object.id.doorwayId === id.doorwayId;
                const secondIdMatch = record.object.id.lodgingId === id.lodgingId;
                return (firstIdMatch && secondIdMatch) ? true : false;
            })),
            hasValue()
        );
    }
}
