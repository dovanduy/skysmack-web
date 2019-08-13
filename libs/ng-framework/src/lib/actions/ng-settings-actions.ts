import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SettingsAppState, SettingsActions } from '@skysmack/redux';
import { Settings, LocalObject, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSettingsActions extends SettingsActions {
    constructor(protected store: NgRedux<SettingsAppState<unknown>>) { super(store); }

    public getMessageParams(record: LocalObject<Settings, string>): StrIndex<string> {
        return {};
    }
}
