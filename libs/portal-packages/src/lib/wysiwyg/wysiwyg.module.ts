import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { wysiwygComponents, wysiwygEntryComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [],
  declarations: [
    ...wysiwygComponents
  ],
  entryComponents: [
    ...wysiwygEntryComponents
  ],
  providers: []
})
export class WYSIWYGModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
