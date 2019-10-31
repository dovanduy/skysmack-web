import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { PhoneLog, PhoneLogsAppState, PHONE_LOGS_REDUCER_KEY } from '@skysmack/packages-phones';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { LocalObject, DependencyOptions } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPhoneLogsStore extends NgRecordStore<PhoneLogsAppState, PhoneLog, number> {
    private deps = [
        new DependencyOptions({
            relationSelector: 'sourcePhone',
            relationIdSelector: 'sourcePhoneId',
            stateSelector: 'phones'
        }),
        new DependencyOptions({
            relationSelector: 'destinationPhone',
            relationIdSelector: 'destinationPhoneId',
            stateSelector: 'phones'
        })
    ];

    constructor(
        protected ngRedux: NgRedux<PhoneLogsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PHONE_LOGS_REDUCER_KEY); }

    public get(packagePath: string): Observable<LocalObject<PhoneLog, number>[]> {
        return this.getWithDependencies(packagePath, this.deps);
    }

    public getSingle(packagePath: string, id: number): Observable<LocalObject<PhoneLog, number>> {
        return this.getSingleWithDependencies(packagePath, id, this.deps);
    }
}
