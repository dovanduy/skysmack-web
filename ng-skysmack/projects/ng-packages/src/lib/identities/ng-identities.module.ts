import { NgModule } from '@angular/core';

import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { RolesEpics, rolesReducer, usersReducer, UsersEpics } from '@skysmack/packages-identities';
import { NgRolesRequests } from './redux/ng-roles-requests';
import { NgUsersRequests } from './redux/ng-users-requests';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgIdentitiesModule {
  constructor(
    rolesRequests: NgRolesRequests,
    usersRequests: NgUsersRequests
  ) {
    ReducerRegistry.Instance.register('roles', rolesReducer);
    registerLazyEpics(new RolesEpics(rolesRequests).epics);

    ReducerRegistry.Instance.register('users', usersReducer);
    registerLazyEpics(new UsersEpics(usersRequests).epics);
  }
}
