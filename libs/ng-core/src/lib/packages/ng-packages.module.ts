import { NgModule } from '@angular/core';
import { packagesReducer, PACKAGES_REDUCER_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesEpics } from './redux/ng-packages-epics';
import { registerRedux } from '@skysmack/ng-framework';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPackagesModule {
  constructor(epics: NgPackagesEpics) {
    registerRedux(PACKAGES_REDUCER_KEY, packagesReducer, epics)
  }
}
