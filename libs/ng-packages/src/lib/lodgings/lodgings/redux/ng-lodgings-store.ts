import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Lodging, LodgingsAppState } from '@skysmack/packages-lodgings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { Observable } from 'rxjs';
import { StrIndex, defined, LocalObject, DependencyOptions } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-core';

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
    ) { super(ngRedux, skysmackStore, 'lodgings'); }

    public get(packagePath: string): Observable<LocalObject<Lodging, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Lodging, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }

    public getAvailableLodgings(packagePath: string): Observable<StrIndex<number[]>> {
        return this.ngRedux.select(state => state).pipe(
            map(state => state.lodgings),
            map(state => state.availableLodgings[packagePath]),
            defined()
        );
    }
}
