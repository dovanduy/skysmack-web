import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMinderRoutingModule } from './siteminder-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSiteMinderModule } from '@skysmack/ng-siteminder';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { siteminderComponents, siteminderEntryComponents } from './siteminder/components/siteminder-components';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgSiteMinderMenuProvider } from './ng-siteminder-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgSiteMinderModule,
    DynamicFormsModule,
    SiteMinderRoutingModule,
    PortalFieldsModule,
  ],
  exports: [],
  declarations: [
    ...siteminderComponents
  ],
  entryComponents: [
    ...siteminderEntryComponents
  ],
  providers: []
})
export class SiteMinderModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    ngMenuProviders: NgMenuProviders,
    ngSiteMinderMenuProvider: NgSiteMinderMenuProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders
      .add(ngSiteMinderMenuProvider);
  }
}
