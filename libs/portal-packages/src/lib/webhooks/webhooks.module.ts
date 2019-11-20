import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebhooksRoutingModule } from './webhooks-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgWebhooksModule } from '@skysmack/ng-webhooks';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { webhooksComponents, webhooksEntryComponents } from './webhooks/components/webhooks-components';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgWebhooksIndexMenuProvider } from './ng-webhooks-index-menu-provider';
import { NgWebhookSettingsFieldsConfig } from './webhooks/ng-webhooks-settings-fields-config';
import { SettingsModule } from '@skysmack/portal-settings';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    WebhooksRoutingModule,
    NgWebhooksModule,
    PortalUiModule,
    SettingsModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...webhooksComponents
  ],
  entryComponents: [
    ...webhooksEntryComponents
  ],
  providers: [
    { provide: 'NgWebhookSettingsFieldsConfig', useClass: NgWebhookSettingsFieldsConfig },
  ]
})
export class WebhooksModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngWebhooksIndexMenuProvider: NgWebhooksIndexMenuProvider
  ) {

    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngWebhooksIndexMenuProvider);
  }
}
