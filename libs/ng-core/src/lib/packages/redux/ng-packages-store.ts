import { Injectable } from '@angular/core';
import { PACKAGES_REDUCER_KEY, PackagesState } from '@skysmack/packages-skysmack-core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { LocalObject, Package, safeUndefinedTo, AvailablePackage, dictionaryToArray, log } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '../../skysmack/redux/ng-skysmack-store';

@Injectable({ providedIn: 'root' })
export class NgPackagesStore extends NgRecordStore<PackagesState, Package, string> {

    protected identifier = 'path';

    constructor(
        protected ngRedux: NgRedux<PackagesState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PACKAGES_REDUCER_KEY); }

    public getAvailablePackages(): Observable<LocalObject<AvailablePackage, string>[]> {
        return this.getState<PackagesState>().pipe(
            map(state => state.availablePackages),
            safeUndefinedTo('object'),
            dictionaryToArray(),
        );
    }
}
