import { NgModule } from '@angular/core';
import { NgAuthenticationRequests } from './redux/ng-authentication-requests';
import { ReducerRegistry, registerEagerEpics } from '@skysmack/redux';
import { authenticationReducer, AuthenticationEpics } from '@skysmack/packages-authentication';

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class NgAuthenticationModule {
    constructor(authenticationRequests: NgAuthenticationRequests) {
        ReducerRegistry.Instance.register('authentication', authenticationReducer);
        registerEagerEpics(new AuthenticationEpics(authenticationRequests).epics);
    }
}
