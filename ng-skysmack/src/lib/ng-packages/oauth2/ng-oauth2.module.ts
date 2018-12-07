import { NgModule } from '@angular/core';
import { registerLazyEpics } from '@skysmack/redux';
import { NgOauth2Requests } from './redux/ng-oauth2-requests';
import { Oauth2Epics } from '@skysmack/packages-oauth2';

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class NgOauth2Module {
    constructor(oauth2Requests: NgOauth2Requests) {
        registerLazyEpics(new Oauth2Epics(oauth2Requests).epics);
    }
}
