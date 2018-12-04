import { NgModule } from '@angular/core';
import { NgAuthenticationRequests } from './redux/ng-authentication-requests';
import { ReducerRegistry, registerWithRootEpic } from '@skysmack/redux';
import { authenticationReducer, AuthenticationEpics } from '@skysmack/packages-authentication';

@NgModule({
    imports: [],
    exports: [],
    providers: [],
})
export class NgAuthenticationModule {
    constructor(authenticationRequests: NgAuthenticationRequests) {
        ReducerRegistry.Instance.register('authentication', authenticationReducer);
        registerWithRootEpic(new AuthenticationEpics(authenticationRequests).epics);
    }
}
