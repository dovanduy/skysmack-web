import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Role, RolesAppState } from '@skysmack/packages-identities';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgRolesStore extends NgRecordReduxStore<RolesAppState, Role, number> {
    constructor(protected ngRedux: NgRedux<RolesAppState>) { super(ngRedux, 'roles'); }
}
