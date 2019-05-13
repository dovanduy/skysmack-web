import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Role, RolesAppState } from '@skysmack/packages-identities';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgRolesStore extends NgRecordStore<RolesAppState, Role, number> {
    constructor(
        protected ngRedux: NgRedux<RolesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'roles'); }
}
