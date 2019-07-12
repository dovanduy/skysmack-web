import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Role, RolesAppState, ROLES_REDUCER_KEY } from '@skysmack/packages-identities';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';

@Injectable({ providedIn: 'root' })
export class NgRolesStore extends NgRecordStore<RolesAppState, Role, number> {
    constructor(
        protected ngRedux: NgRedux<RolesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, ROLES_REDUCER_KEY); }
}
