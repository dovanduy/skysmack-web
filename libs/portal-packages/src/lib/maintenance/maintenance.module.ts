import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgAssignmentsModule } from '@skysmack/ng-maintenance';
import { PortalUiModule, LanguageService, NgMenuProviders } from '@skysmack/portal-ui';
import { assignmentTypesComponents } from './assignment-types/components/assignment-types-components';
import { assignmentsComponents } from './assignments/components/assignments-components';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { recurringAssignmentsComponents } from './recurring-assignments/components/recurring-assignments-components';
import { maintenanceStatesComponents } from './maintenance-states/components/maintenance-states-components';
import { assignmentsAllComponents } from './components/assignments-all-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgAssignmentAllMenuProvider } from './ng-assignments-all-menu-provider';
import { NgAssignmentsMenuProvider } from './assignments/ng-assignments-menu-provider';
import { NgAssignmentTypesMenuProvider } from './assignment-types/ng-assignment-types-menu-provider';
import { NgMaintenanceStatesMenuProvider } from './maintenance-states/ng-maintenance-states-menu-provider';
import { NgRecurringAssignmentsMenuProvider } from './recurring-assignments/ng-recurring-assignments-menu-provider';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaintenanceRoutingModule,
    NgAssignmentsModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule
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
  constructor(
    ngMenuProviders: NgMenuProviders, 
    ngAssignmentAllMenuProvider: NgAssignmentAllMenuProvider,
    ngAssignmentsMenuProvider: NgAssignmentsMenuProvider,
    ngAssignmentTypesMenuProvider: NgAssignmentTypesMenuProvider,
    ngMaintenanceStatesMenuProvider: NgMaintenanceStatesMenuProvider,
    ngRecurringAssignmentsMenuProvider: NgRecurringAssignmentsMenuProvider
    ) {
      ngMenuProviders
      .add(ngAssignmentAllMenuProvider)
      .add(ngAssignmentsMenuProvider)
      .add(ngAssignmentTypesMenuProvider)
      .add(ngMaintenanceStatesMenuProvider)
      .add(ngRecurringAssignmentsMenuProvider)
     }
}
