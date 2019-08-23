import { NgModule } from '@angular/core';
import { NgOAuth2Epics } from './redux/ng-oauth-2-epics';
import { registerEpics } from '@skysmack/ng-framework';
import { OAUTH2_AREA_KEY } from 'libs/packages/oauth2/src';

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class NgOAuth2Module {
    constructor(
        epics: NgOAuth2Epics,
    ) {
        registerEpics(epics, OAUTH2_AREA_KEY);
    }
}
