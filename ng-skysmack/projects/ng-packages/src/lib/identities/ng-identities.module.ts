import { NgModule } from '@angular/core';
import { rolesReducer, usersReducer, identitiesSettingsReducer } from '@skysmack/packages-identities';
import { NgRolesEpics } from './redux/ng-roles-epics';
import { NgUsersEpics } from './redux/ng-users-epics';
import { registerRedux } from '@skysmack/ng-redux';
import { NgIdentitiesSettingsEpics } from './redux/ng-identities-settings-epics';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgIdentitiesModule {
  constructor(
    rolesEpics: NgRolesEpics,
    usersEpics: NgUsersEpics,
    identitiesSettingsEpics: NgIdentitiesSettingsEpics
  ) {
    registerRedux('roles', rolesReducer, rolesEpics);
    registerRedux('users', usersReducer, usersEpics);
    registerRedux('identitiesSettings', identitiesSettingsReducer, identitiesSettingsEpics);
  }
}
