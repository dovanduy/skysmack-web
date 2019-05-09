import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Lodging, LodgingsAppState } from '@skysmack/packages-lodgings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { Observable } from 'rxjs';
import { StrIndex, defined, LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingsStore extends NgRecordStore<LodgingsAppState, Lodging, number> {
    constructor(protected ngRedux: NgRedux<LodgingsAppState>) { super(ngRedux, 'lodgings'); }

    public get(packagePath: string): Observable<LocalObject<Lodging, number>[]> {
        return this.getWithDependencies(packagePath, 'lodgingType', 'lodgingTypeId', 'lodgingTypes');
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<Lodging, number>> {
        return this.getSingleWithDependency(packagePath, id, 'lodgingType', 'lodgingTypeId', 'lodgingTypes');
    }

    public getAvailableLodgings(packagePath: string): Observable<StrIndex<number[]>> {
        return this.ngRedux.select(state => state).pipe(
            map(state => state.lodgings),
            map(state => state.availableLodgings[packagePath]),
            defined()
        );
    }
}
