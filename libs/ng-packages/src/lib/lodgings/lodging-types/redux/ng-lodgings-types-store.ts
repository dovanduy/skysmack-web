import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-framework';
import { LodgingTypesAppState, LodgingType, LODGING_TYPES_REDUCER_KEY } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { StrIndex, defined, safeUndefinedTo } from '@skysmack/framework';
import { map, tap } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesStore extends NgRecordStore<LodgingTypesAppState, LodgingType, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingTypesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGING_TYPES_REDUCER_KEY); }

    public getAvailableLodgingTypes(packagePath: string): Observable<StrIndex<StrIndex<number[]>>> {
        return this.ngRedux.select(state => state).pipe(
            map(state => state.lodgingTypes),
            map(state => state.availableLodgingTypes[packagePath]),
            defined()
        );
    }

    public getAvailableLodgingTypesCount(packagePath: string): Observable<StrIndex<StrIndex<number>>> {
        return this.ngRedux.select(state => state).pipe(
            map(state => state.lodgingTypes),
            map(lodgingTypesState => lodgingTypesState.availableLodgingTypesCount),
            map(availableLodgingTypesCount => availableLodgingTypesCount[packagePath]),
            safeUndefinedTo('object')
        );
    }
}
