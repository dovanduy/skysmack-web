import { NgModule } from '@angular/core';
import { rolesReducer, usersReducer } from '@skysmack/packages-identities';
import { NgRolesEpics } from './identity-roles/redux/ng-roles-epics';
import { NgUsersEpics } from './identity-users/redux/ng-users-epics';
import { registerRedux } from '@skysmack/ng-redux';

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
    registerRedux('roles', rolesReducer, rolesEpics);
    registerRedux('users', usersReducer, usersEpics);
  }
}
