import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { NgRecordStore } from '@skysmack/ng-redux';
import { LodgingTypesAppState, LodgingType, LODGING_TYPES_AREA_KEY } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { StrIndex, defined } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesStore extends NgRecordStore<LodgingTypesAppState, LodgingType, number> {
    constructor(protected ngRedux: NgRedux<LodgingTypesAppState>) { super(ngRedux, LODGING_TYPES_AREA_KEY); }

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
            map(state => state.availableLodgingTypesCount[packagePath]),
            defined()
        );
    }
}
