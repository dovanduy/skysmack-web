import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardSettingsActions } from './standard-settings-actions';
import { Settings } from '@skysmack/ng-ui';
import { map, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StandardSettingsRedux {

    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: StandardSettingsActions,
    ) { }

    public setLanguage(lang: string): void {
        this.ngRedux.dispatch(this.actions.setLanguage(lang));
    }


    public setTenantUrl(tenantUrl: string) {
        this.ngRedux.dispatch(this.actions.setTenantUrl(tenantUrl));
    }

    public getSettings = (): Observable<Settings> => {
        return this.ngRedux.select((state: any) => state).pipe(
            map(state => {
                const temp = {
                    language: 'en',
                    tenantUrl: ''
                };
                return state.standardSettings ? state.standardSettings.settings : temp;
            })
        );
    }
}
