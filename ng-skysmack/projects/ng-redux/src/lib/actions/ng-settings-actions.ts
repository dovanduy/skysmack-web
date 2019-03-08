import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SettingsAppState, SettingsActions } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgSettingsActions extends SettingsActions {
    constructor(protected store: NgRedux<SettingsAppState>) { super(store); }
}
