import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsActions } from './settings-actions';
import { Settings } from './../../models/settings';

@Injectable({ providedIn: 'root' })
export class SettingsRedux {

    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: SettingsActions,
    ) { }

    public setLanguage(lang: string): void {
        this.ngRedux.dispatch(this.actions.setLanguage(lang));
    }


    public setTenantUrl(tenantUrl: string) {
        this.ngRedux.dispatch(this.actions.setTenantUrl(tenantUrl));
    }

    public getSettings = (): Observable<Settings> => this.ngRedux.select((state: any) => state.settings.settings);
}
