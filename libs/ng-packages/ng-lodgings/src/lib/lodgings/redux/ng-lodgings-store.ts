import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Lodging, LodgingsAppState, LODGINGS_REDUCER_KEY, LodgingsState } from '@skysmack/packages-lodgings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions, StrIndex, defined, NumIndex } from '@skysmack/framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { map } from 'rxjs/operators';

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

    public getAvailableLodgings(packagePath: string, startDate: any, endDate: any): Observable<NumIndex<boolean>> {
        return this.getState<LodgingsState>().pipe(
            map(state => state.availableLodgings[packagePath]),
            defined(),
            map(state => state[`${startDate}:${endDate}`]),
            defined()
        );
    }

    public getAvailableLodgingsDaily(packagePath: string): Observable<StrIndex<NumIndex<boolean>>> {
        return this.getState<LodgingsState>().pipe(
            map(state => state.availableLodgingsDaily[packagePath]),
            defined()
        );
    }
}
