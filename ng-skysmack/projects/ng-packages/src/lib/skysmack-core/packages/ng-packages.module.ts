import { NgModule } from '@angular/core';
import { packagesReducer, PACKAGES_AREA_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesEpics } from './redux/ng-packages-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPackagesModule {
  constructor(epics: NgPackagesEpics) {
    registerRedux(PACKAGES_AREA_KEY, packagesReducer, epics)
  }
}
