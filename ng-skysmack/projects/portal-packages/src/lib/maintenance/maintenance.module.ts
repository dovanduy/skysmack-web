import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { NgAssignmentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, LanguageService } from '@skysmack/portal-ui';
import { assignmentTypesComponents } from './assignment-types/components/assignment-types-components';
import { assignmentsComponents } from './assignments/components/assignments-components';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { recurringAssignmentsComponents } from './recurring-assignments/components/recurring-assignments-components';
import { maintenanceStatesComponents } from './maintenance-states/components/maintenance-states-components';
import { assignmentsAllComponents } from './components/assignments-all-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaintenanceRoutingModule,
    NgAssignmentsModule,
    PortalUiModule
  ],
  declarations: [
    ...assignmentsComponents,
    ...assignmentsAllComponents,
    ...recurringAssignmentsComponents,
    ...assignmentTypesComponents,
    ...maintenanceStatesComponents,
  ],
  providers: [
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class MaintenanceModule {
  constructor(public languageService: LanguageService) { }
}
