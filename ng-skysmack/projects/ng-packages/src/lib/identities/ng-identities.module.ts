import { NgModule } from '@angular/core';
import { rolesReducer, usersReducer } from '@skysmack/packages-identities';
import { NgRolesEpics } from './redux/ng-roles-epics';
import { NgUsersEpics } from './redux/ng-users-epics';
import { registerRedux } from '@skysmack/ng-redux';
import { NgLockoutSettingsFieldsConfig } from './ng-lockout-settings-fields-config';
import { NgUserSettingsFieldsConfig } from './ng-user-settings-fields-config';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    { provide: 'NgLockoutSettingsFieldsConfig', useClass: NgLockoutSettingsFieldsConfig },
    { provide: 'NgUserSettingsFieldsConfig', useClass: NgUserSettingsFieldsConfig }
  ],
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
