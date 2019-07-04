import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgAssignmentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, LanguageService } from '@skysmack/portal-ui';
import { assignmentTypesComponents } from './assignment-types/components/assignment-types-components';
import { assignmentsComponents } from './assignments/components/assignments-components';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { recurringAssignmentsComponents } from './recurring-assignments/components/recurring-assignments-components';
import { maintenanceStatesComponents } from './maintenance-states/components/maintenance-states-components';
import { assignmentsAllComponents } from './components/assignments-all-components';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaintenanceRoutingModule,
    NgAssignmentsModule,
    PortalUiModule,
    NgDynamicFormsModule
  ],
  declarations: [
    ...assignmentsComponents,
    ...assignmentsAllComponents,
    ...recurringAssignmentsComponents,
    ...assignmentTypesComponents,
    ...maintenanceStatesComponents,
  ],
  providers: [
    LanguageService
  ]
})
export class MaintenanceModule {
  constructor() { }
}
