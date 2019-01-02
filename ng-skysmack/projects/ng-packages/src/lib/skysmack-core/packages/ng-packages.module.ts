import { NgModule } from '@angular/core';
import { ReducerRegistry, registerLazyEpics } from '@skysmack/redux';
import { NgPackagesRequests } from './redux/ng-packages-requests';
import { packagesReducer, PackagesEpics } from '@skysmack/packages-skysmack-core';


@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class NgPackagesModule {
  constructor(requests: NgPackagesRequests) {
    ReducerRegistry.Instance.register('packages', packagesReducer);
    registerLazyEpics(new PackagesEpics(requests).epics);
  }
}
