import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgMaintenanceModule } from '@skysmack/ng-maintenance';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { assignmentTypesComponents } from './assignment-types/components/assignment-types-components';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { recurringAssignmentsComponents } from './recurring-assignments/components/recurring-assignments-components';
import { maintenanceStatesComponents } from './maintenance-states/components/maintenance-states-components';
import { assignmentsAllComponents } from './components/assignments-all-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgAssignmentAllMenuProvider } from './ng-assignments-all-menu-provider';
import { singleAssignmentsComponents } from './single-assignments/components/single-assignments-components';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaintenanceRoutingModule,
    NgMaintenanceModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule
  ],
  declarations: [
    ...singleAssignmentsComponents,
    ...assignmentsAllComponents,
    ...recurringAssignmentsComponents,
    ...assignmentTypesComponents,
    ...maintenanceStatesComponents,
  ],
  providers: []
})
export class MaintenanceModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngAssignmentAllMenuProvider: NgAssignmentAllMenuProvider
  ) {
    ngMenuProviders
      .add(ngAssignmentAllMenuProvider)
  }
}
