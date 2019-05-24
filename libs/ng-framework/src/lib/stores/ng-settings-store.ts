import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LocalObject, log, defined } from '@skysmack/framework';
import { SettingsStore, SettingsAppState } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgSettingsStore implements SettingsStore {
    constructor(protected store: NgRedux<SettingsAppState<unknown>>) { }

    public get<TSettings>(packagePath: string, settingsKey: string): Observable<LocalObject<TSettings, unknown>> {
        return this.store.select(state => state.settings).pipe(
            map((state: SettingsAppState<TSettings>) => state[packagePath]),
            defined(),
            map(area => area[settingsKey]),
            defined()
        );
    }
}
