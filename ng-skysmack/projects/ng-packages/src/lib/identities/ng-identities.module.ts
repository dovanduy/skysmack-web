import { NgModule } from '@angular/core';

import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { RolesEpics, rolesReducer } from '@skysmack/packages-identities';
import { NgRolesRequests } from './redux/ng-roles-requests';
import { NgRolesActions } from './redux/ng-roles-actions';
import { NgRolesStore } from './redux/ng-roles-store';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    [
      { provide: 'NgRolesActions', useClass: NgRolesActions },
      { provide: 'NgRolesStore', useClass: NgRolesStore }
    ]
  ],
})
export class NgIdentitiesModule {
  constructor(rolesRequests: NgRolesRequests) {
    ReducerRegistry.Instance.register('roles', rolesReducer);
    registerLazyEpics(new RolesEpics(rolesRequests).epics);
  }
}
