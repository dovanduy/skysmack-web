import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ApplicationsAppState, ApplicationsActions } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgApplicationsActions extends ApplicationsActions {
    constructor(protected store: NgRedux<ApplicationsAppState>) { super(store); }
}
