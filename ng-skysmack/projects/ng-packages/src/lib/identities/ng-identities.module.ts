import { NgModule } from '@angular/core';
import { rolesReducer, usersReducer, ROLES_AREA_KEY, USERS_AREA_KEY } from '@skysmack/packages-identities';
import { NgRolesEpics } from './redux/ng-roles-epics';
import { NgUsersEpics } from './redux/ng-users-epics';
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
    registerRedux(ROLES_AREA_KEY, rolesReducer, rolesEpics);
    registerRedux(USERS_AREA_KEY, usersReducer, usersEpics);
  }
}
