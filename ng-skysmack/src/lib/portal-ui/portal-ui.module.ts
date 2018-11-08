import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReducerRegistry } from '@skysmack/redux';
import { uiReducer } from './redux/ui-reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MaterialModule]
})
export class PortalUiModule {
  constructor() {
    ReducerRegistry.Instance.register('ui', uiReducer);
  }
}
