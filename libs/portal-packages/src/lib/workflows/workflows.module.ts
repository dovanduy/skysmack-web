import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowsRoutingModule } from './workflows-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgWorkflowsModule } from '@skysmack/ng-workflows';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { workflowsComponents, workflowsEntryComponents } from './workflows/components/workflows-components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgWorkflowsIndexMenuProvider } from './ng-workflows-index-menu-provider';
import { NgWorkflowSettingsFieldsConfig } from './workflows/ng-workflows-settings-fields-config';
import { SettingsModule } from '@skysmack/portal-settings';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    WorkflowsRoutingModule,
    NgWorkflowsModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...workflowsComponents
  ],
  entryComponents: [
    ...workflowsEntryComponents
  ],
  providers: [
    { provide: 'NgWorkflowSettingsFieldsConfig', useClass: NgWorkflowSettingsFieldsConfig },
  ]
})
export class WorkflowsModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngWorkflowsIndexMenuProvider: NgWorkflowsIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngWorkflowsIndexMenuProvider);
  }
}
