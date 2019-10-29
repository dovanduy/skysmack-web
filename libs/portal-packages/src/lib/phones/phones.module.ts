import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from '@skysmack/portal-ui';
import { NgPhonesModule } from '@skysmack/ng-phones';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { PhonesRoutingModule } from './phones-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgPhonesModule,
    DynamicFormsModule,
    PhonesRoutingModule,
    PortalFieldsModule,
  ],
  exports: [],
  declarations: [
  ],
  entryComponents: [],
  providers: []
})
export class PhonesModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
  }
}
