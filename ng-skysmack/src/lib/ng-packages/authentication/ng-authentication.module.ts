import { NgModule } from '@angular/core';
import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { authenticationReducer, AuthenticationEpics } from '@skysmack/packages-authentication';
import { NgAuthenticationRequests } from './redux/ng-authentication-requests';

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class NgAuthenticationModule {
    constructor(authenticationRequests: NgAuthenticationRequests) {
        registerLazyEpics(new AuthenticationEpics(authenticationRequests).epics);
    }
}
