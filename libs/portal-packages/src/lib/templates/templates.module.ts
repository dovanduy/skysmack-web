import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgTemplatesModule } from '@skysmack/ng-templates';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { templatesComponents, templatesEntryComponents } from './templates/components/templates-components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgTemplatesIndexMenuProvider } from './ng-templates-index-menu-provider';
import { WYSIWYGModule } from '../wysiwyg';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TemplatesRoutingModule,
    NgTemplatesModule,
    WYSIWYGModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...templatesComponents
  ],
  entryComponents: [
    ...templatesEntryComponents
  ],
  providers: []
})
export class TemplatesModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngTemplatesIndexMenuProvider: NgTemplatesIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngTemplatesIndexMenuProvider);
  }
}
