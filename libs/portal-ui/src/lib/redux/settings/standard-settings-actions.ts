import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable({ providedIn: 'root' })
export class StandardSettingsActions {

    public static SET_LANGUAGE = 'SET_LANGUAGE';
    public static SET_TENANT_URL = 'SET_TENANT_URL';

    constructor() { }

    public setTenantUrl(tenantUrl: string): AnyAction {
        return { type: StandardSettingsActions.SET_TENANT_URL, payload: tenantUrl };
    }

    public setLanguage(lang: string): AnyAction {
        return { type: StandardSettingsActions.SET_LANGUAGE, payload: lang };
    }
}

