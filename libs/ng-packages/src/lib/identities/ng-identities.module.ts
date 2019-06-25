import { NgModule } from '@angular/core';
import { registerRedux } from '@skysmack/ng-framework';
import { rolesReducer, usersReducer, USERS_REDUCER_KEY, ROLES_REDUCER_KEY, ACCOUNTS_REDUCER_KEY, accountReducer } from '@skysmack/packages-identities';
import { NgRolesEpics } from './identity-roles/redux/ng-roles-epics';
import { NgUsersEpics } from './identity-users/redux/ng-users-epics';
import { NgAccountEpics } from './accounts/redux/ng-account-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgIdentitiesModule {
  constructor(
    rolesEpics: NgRolesEpics,
    usersEpics: NgUsersEpics,
    accountEpics: NgAccountEpics
  ) {
    registerRedux(ROLES_REDUCER_KEY, rolesReducer, rolesEpics);
    registerRedux(USERS_REDUCER_KEY, usersReducer, usersEpics);
    registerRedux(ACCOUNTS_REDUCER_KEY, accountReducer, accountEpics);
  }
}
