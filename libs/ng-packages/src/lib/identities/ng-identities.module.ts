import { NgModule } from '@angular/core';
import { rolesReducer, usersReducer, USERS_REDUCER_KEY, ROLES_REDUCER_KEY } from '@skysmack/packages-identities';
import { NgRolesEpics } from './identity-roles/redux/ng-roles-epics';
import { NgUsersEpics } from './identity-users/redux/ng-users-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgIdentitiesModule {
  constructor(
    rolesEpics: NgRolesEpics,
    usersEpics: NgUsersEpics
  ) {
    registerRedux(ROLES_REDUCER_KEY, rolesReducer, rolesEpics);
    registerRedux(USERS_REDUCER_KEY, usersReducer, usersEpics);
  }
}
