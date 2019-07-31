import { Injectable } from '@angular/core';
import { PACKAGES_REDUCER_KEY, PackagesState, PackagesAppState } from '@skysmack/packages-skysmack-core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { LocalObject, Package, safeUndefinedTo, AvailablePackage, dictionaryToArray, log } from '@skysmack/framework';
import { map } from 'rxjs/operators';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgPackagesStore extends NgRecordStore<PackagesState, Package, string> {

    protected identifier = 'path';

    constructor(
        public ngRedux: NgRedux<PackagesState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PACKAGES_REDUCER_KEY); }

    public getAvailablePackages(packagePath: string): Observable<LocalObject<AvailablePackage, string>[]> {
        return this.getState<PackagesState>().pipe(
            map(state => state.availablePackages[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray(),
        );
    }

    public getAvailablePackagesAsArray(packagePath: string): LocalObject<AvailablePackage, string>[] {
        const state = (this.ngRedux.getState() as unknown) as PackagesAppState;
        const availablePackages = state && state.packages && state.packages.availablePackages && state.packages.availablePackages[packagePath];
        return availablePackages ? Object.keys(availablePackages).map(key => availablePackages[key]) : [];
    }
}
