import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingsAvailabilityAppState } from '@skysmack/packages-lodgings';
import { Observable } from 'rxjs';
import { StrIndex, defined } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityStore {
    constructor(
        protected ngRedux: NgRedux<LodgingsAvailabilityAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { }

    public getAvailableLodgings(packagePath: string, startDate: string, endDate: string): Observable<StrIndex<boolean>> {
        return this.ngRedux.select(state => state.lodgingsAvailability).pipe(
            map(state => state.availableLodgings[packagePath]),
            defined(),
            map(state => state[`${startDate}:${endDate}`]),
            defined()
        );
    }

    public getAvailableLodgingsDaily(packagePath: string): Observable<StrIndex<number[]>> {
        return this.ngRedux.select(state => state.lodgingsAvailability).pipe(
            map(state => state.availableLodgingsDaily[packagePath]),
            defined()
        );
    }
}
