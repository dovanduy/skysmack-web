import { NgModule } from '@angular/core';
import { registerRedux, NgSignalR } from '@skysmack/ng-framework';
import { rolesReducer, usersReducer, USERS_REDUCER_KEY, ROLES_REDUCER_KEY, ACCOUNT_REDUCER_KEY, accountReducer, APPLICATIONS_REDUCER_KEY, applicationsReducer, CLIENTS_REDUCER_KEY, clientsReducer } from '@skysmack/packages-identities';
import { NgRolesEpics } from './identity-roles/redux/ng-roles-epics';
import { NgUsersEpics } from './identity-users/redux/ng-users-epics';
import { NgAccountEpics } from './accounts/redux/ng-account-epics';
import { NgApplicationsEpics } from './identity-applications';
import { ClientsEpics } from './clients/redux/ng-clients-epics';
import { SignalRClientsProvider } from './clients/signal-r-clients-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgIdentitiesModule {
  constructor(
    rolesEpics: NgRolesEpics,
    usersEpics: NgUsersEpics,
    accountEpics: NgAccountEpics,
    applicationsEpics: NgApplicationsEpics,
    // signalR: NgSignalR,
    clientsEpics: ClientsEpics,
    clientsSRProvider: SignalRClientsProvider,
  ) {
    registerRedux(ROLES_REDUCER_KEY, rolesReducer, rolesEpics);
    registerRedux(USERS_REDUCER_KEY, usersReducer, usersEpics);
    registerRedux(ACCOUNT_REDUCER_KEY, accountReducer, accountEpics);
    registerRedux(CLIENTS_REDUCER_KEY, clientsReducer, clientsEpics);
    registerRedux(APPLICATIONS_REDUCER_KEY, applicationsReducer, applicationsEpics);
    // TODO: REVIEW  SIGNAL-R
    // signalR.instance.registerProvider(clientsSRProvider);
  }
}
