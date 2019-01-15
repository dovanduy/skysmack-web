import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { rolesReducer, usersReducer } from '@skysmack/packages-identities';
import { NgRolesEpics } from './redux/ng-roles-epics';
import { NgUsersEpics } from './redux/ng-users-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgIdentitiesModule {
  constructor(
    rolesEpics: NgRolesEpics,
    usersEpics: NgUsersEpics
  ) {
    ReducerRegistry.Instance.register('roles', rolesReducer);
    ReducerRegistry.Instance.register('users', usersReducer);
    registerEpics(rolesEpics);
    registerEpics(usersEpics);
  }
}
