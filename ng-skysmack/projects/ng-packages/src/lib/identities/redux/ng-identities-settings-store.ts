import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IdentitiesSettingsAppState, IdentitiesSettings } from '@skysmack/packages-identities';
import { Observable } from 'rxjs';
import { LocalObject } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesSettingsStore {
    constructor(protected store: NgRedux<IdentitiesSettingsAppState>) { }

    public getSettings(packagePath: string): Observable<LocalObject<IdentitiesSettings, unknown>> {
        return this.store.select(state => state).pipe(
            map(state => state.identitiesSettings.settings[packagePath]),
        );
    }
}
