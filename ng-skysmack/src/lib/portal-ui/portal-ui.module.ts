import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReducerRegistry, epic$ } from '@skysmack/redux';
import { uiReducer } from './redux/ui-reducers';
import { settingsReducer } from './redux/settings';
import { authUserReducer } from './redux/authenticated-user/auth-user-reducer';
import { AuthUserRequests, AuthUserEpics, AuthUserActions } from './redux';
import { NgRedux } from '@angular-redux/store';
import { combineEpics } from 'redux-observable';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MaterialModule]
})
export class PortalUiModule {
  constructor(
    protected authUserRequests: AuthUserRequests,
    protected authUserActions: AuthUserActions,
    protected ngRedux: NgRedux<any>
  ) {
    ReducerRegistry.Instance.register('ui', uiReducer);
    ReducerRegistry.Instance.register('settings', settingsReducer);
    ReducerRegistry.Instance.register('authenticatedUser', authUserReducer);
    epic$.next(combineEpics(epic$.getValue(), new AuthUserEpics(ngRedux, authUserActions, authUserRequests).getEpics()));
  }
}
