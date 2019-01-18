import { NgModule } from '@angular/core';
import { ReducerRegistry } from '@skysmack/redux';
import { packagesReducer } from '@skysmack/packages-skysmack-core';
import { NgPackagesEpics } from './redux/ng-packages-epics';
import { registerEpics } from '@skysmack/ng-redux';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPackagesModule {
  constructor(epics: NgPackagesEpics) {
    ReducerRegistry.Instance.register('packages', packagesReducer);
    registerEpics(epics);
  }
}
