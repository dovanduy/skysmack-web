import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Application, ApplicationsAppState, APPLICATIONS_REDUCER_KEY, ApplicationsState } from '@skysmack/packages-identities';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { defined } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgApplicationsStore extends NgRecordStore<ApplicationsAppState, Application, number> {
    constructor(
        protected ngRedux: NgRedux<ApplicationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, APPLICATIONS_REDUCER_KEY); }

    public getApplicationRoles(packagePath: string, id: number): Observable<string[]> {
        return this.getState<ApplicationsState>().pipe(
            map(state => state.applicationsRoles),
            defined(),
            map(applicationsRoles => applicationsRoles[packagePath]),
            defined(),
            map(applicationRolesDictionary => applicationRolesDictionary[id])
        );
    }
}
