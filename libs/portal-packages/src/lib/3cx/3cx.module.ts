import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { Ng3CXModule } from '@skysmack/ng-3cx';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { PBX_3CXRoutingModule } from './3cx-routing.module';
import { NgCallDataSettingsFieldsConfig } from './ng-call-data-settings-fields-config';
import { Ng3CXMenuProvider } from './ng-3cx-menu-provider';
import { pbx_3CXComponents, pbx_3CXEntryComponents } from './components/3cx-components';
import { SettingsModule } from '@skysmack/portal-settings';
import { DragDropModule } from '@angular/cdk/drag-drop';

const material = [DragDropModule];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    Ng3CXModule,
    DynamicFormsModule,

    PBX_3CXRoutingModule,
    PortalFieldsModule,
    SettingsModule,
    ...material
  ],
  exports: [],
  declarations: [
    ...pbx_3CXComponents
  ],
  entryComponents: [
    ...pbx_3CXEntryComponents
  ],
  providers: [
    { provide: 'NgCallDataSettingsFieldsConfig', useClass: NgCallDataSettingsFieldsConfig },
  ]
})
export class PBX_3CXModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ng3CXMenuProvider: Ng3CXMenuProvider,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ng3CXMenuProvider);
  }
}
