import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';

@Injectable({ providedIn: 'root' })
export class TranslationActions {

    public static SET_LANGUAGE = 'SET_LANGUAGE';

    constructor() { }

    public setLanguage(lang: string): AnyAction {
        return { type: TranslationActions.SET_LANGUAGE, payload: lang };
    }
}

