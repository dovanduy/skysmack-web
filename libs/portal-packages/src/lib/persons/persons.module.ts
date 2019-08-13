import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from '@skysmack/ng-persons';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { personsComponents, personsEntryComponents } from './persons/components/persons-components';

import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver, NgDashboardProviders } from '@skysmack/ng-framework';
import { NgPersonsDashboardProvider } from './ng-persons-dashboard-provider';
import { NgPersonsMenuProvider } from './ng-persons-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgPersonsModule,
    DynamicFormsModule,
    PersonsRoutingModule,
    PortalFieldsModule,
  ],
  exports: [],
  declarations: [
    ...personsComponents
  ],
  entryComponents: [
    ...personsEntryComponents
  ],
  providers: []
})
export class PersonsModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    dashboardProviders: NgDashboardProviders,
    personsDashboardProvider: NgPersonsDashboardProvider,
    ngMenuProviders: NgMenuProviders,
    ngPersonsMenuProvider: NgPersonsMenuProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    dashboardProviders.add(personsDashboardProvider);
    ngMenuProviders
      .add(ngPersonsMenuProvider);
  }
}
