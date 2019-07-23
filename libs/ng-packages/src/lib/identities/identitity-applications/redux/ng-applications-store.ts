import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Application, ApplicationsAppState, APPLICATIONS_REDUCER_KEY } from '@skysmack/packages-identities';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgApplicationsStore extends NgRecordStore<ApplicationsAppState, Application, number> {
    constructor(
        protected ngRedux: NgRedux<ApplicationsAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, APPLICATIONS_REDUCER_KEY); }
}
