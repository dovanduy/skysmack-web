import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgPersonsModule } from '@skysmack/ng-packages';
import { PortalUiModule } from '@skysmack/portal-ui';
import { personsComponents, personsEntryComponents } from './persons/components/persons-components';
import { LanguageService } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver, DashboardsProvider } from '@skysmack/ng-framework';
import { PersonsDashboardComponent } from './persons/components/persons-dashboard/persons-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgPersonsModule,
    DynamicFormsModule,
    PersonsRoutingModule,
    PortalFieldsModule
  ],
  exports: [],
  declarations: [
    ...personsComponents
  ],
  entryComponents: [
    ...personsEntryComponents
  ],
  providers: [
    LanguageService
  ]
})
export class PersonsModule {
  constructor(
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
    dashboardsProvider: DashboardsProvider
  ) {
    coalescingResolver.registerResolver(localResolver);
    dashboardsProvider.add(PersonsDashboardComponent);
  }
}
