import { NgModule } from '@angular/core';
import { packagesReducer } from '@skysmack/packages-skysmack-core';
import { NgPackagesEpics } from './redux/ng-packages-epics';
import { registerRedux } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPackagesModule {
  constructor(epics: NgPackagesEpics) {
    registerRedux('packages', packagesReducer, epics)
  }
}
