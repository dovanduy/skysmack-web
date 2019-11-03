import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { PhoneNumber, PhoneNumbersAppState, PHONE_NUMBERS_REDUCER_KEY } from '@skysmack/packages-phones';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPhoneNumbersStore extends NgRecordStore<PhoneNumbersAppState, PhoneNumber, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'phone',
            relationIdSelector: 'phoneId',
            stateSelector: 'phones'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<PhoneNumbersAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PHONE_NUMBERS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<PhoneNumber, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<PhoneNumber, number>> {
        return this.getSingleWithDependency(packagePath, id, this.deps);
    }
}
