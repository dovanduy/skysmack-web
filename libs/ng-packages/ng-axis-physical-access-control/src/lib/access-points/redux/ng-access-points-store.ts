import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { AccessPointsAppState } from './access-points-reducer';
import { ACCESS_POINTS_REDUCER_KEY } from './../constants/constants';
import { AccessPoint, } from '../models/access-point';
import { DependencyOptions, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgAccessPointsStore extends NgRecordStore<AccessPointsAppState, AccessPoint, string> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'doorway',
            relationIdSelector: 'doorwayId',
            stateSelector: 'doorways',
            dependencyIndexes: [0]
        })
    ];

    constructor(
        protected ngRedux: NgRedux<AccessPointsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ACCESS_POINTS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<AccessPoint, string>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: string): Observable<LocalObject<AccessPoint, string>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
