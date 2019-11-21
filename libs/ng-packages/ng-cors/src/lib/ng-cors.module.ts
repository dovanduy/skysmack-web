import { NgModule } from '@angular/core';
import { corsReducer, CORS_REDUCER_KEY } from '@skysmack/packages-cors';
import { CorsEpics } from './cors/redux/ng-cors-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgCorsModule {
  constructor(
    corsEpics: CorsEpics,
  ) {
    registerRedux(CORS_REDUCER_KEY, corsReducer, corsEpics);
  }
}
