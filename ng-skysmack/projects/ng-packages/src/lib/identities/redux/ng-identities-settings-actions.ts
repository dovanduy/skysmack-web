import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IdentitiesSettingsActions, IdentitiesSettingsAppState } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesSetingsActions extends IdentitiesSettingsActions {
    constructor(protected store: NgRedux<IdentitiesSettingsAppState>) {
        super(store);
    }
}
