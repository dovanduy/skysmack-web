import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Lodging, LodgingsAppState, LODGINGS_REDUCER_KEY } from '@skysmack/packages-lodgings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { StrIndex, defined, LocalObject, DependencyOptions } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgLodgingsStore extends NgRecordStore<LodgingsAppState, Lodging, number> {

    private deps = [
        new DependencyOptions({
            relationSelector: 'lodgingType',
            relationIdSelector: 'lodgingTypeId',
            stateSelector: 'lodgingTypes'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<LodgingsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGINGS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<Lodging, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Lodging, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }

    public getAvailableLodgings(packagePath: string, startDate: string, endDate: string): Observable<StrIndex<boolean>> {
        return this.ngRedux.select(state => state).pipe(
            map(state => state.lodgings),
            map(state => state.availableLodgings[packagePath]),
            defined(),
            map(state => state[`${startDate}:${endDate}`]),
            defined()
        );
    }

    public getAvailableLodgingsDaily(packagePath: string): Observable<StrIndex<number[]>> {
        return this.ngRedux.select(state => state).pipe(
            map(state => state.lodgings),
            map(state => state.availableLodgingsDaily[packagePath]),
            defined()
        );
    }
}
