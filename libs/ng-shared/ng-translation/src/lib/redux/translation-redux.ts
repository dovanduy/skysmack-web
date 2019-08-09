import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationActions } from './translation-actions';
import { TranslationAppState } from './translation-reducers';

@Injectable({ providedIn: 'root' })
export class TranslationRedux {

    constructor(
        protected ngRedux: NgRedux<TranslationAppState>,
        protected actions: TranslationActions,
    ) { }

    public setLanguage(lang: string): void {
        this.ngRedux.dispatch(this.actions.setLanguage(lang));
    }

    public getLanguage = (): Observable<string> => {
        return this.ngRedux.select((state: TranslationAppState) => state).pipe(
            map(state => state.translation.language)
        );
    }
}
