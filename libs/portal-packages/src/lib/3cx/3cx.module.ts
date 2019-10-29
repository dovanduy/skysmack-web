import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from '@skysmack/portal-ui';
import { Ng3CXModule } from '@skysmack/ng-3cx';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { PBX_3CXRoutingModule } from './3cx-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    Ng3CXModule,
    DynamicFormsModule,
    PBX_3CXRoutingModule,
    PortalFieldsModule,
  ],
  exports: [],
  declarations: [
  ],
  entryComponents: [],
  providers: []
})
export class PBX_3CXModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
