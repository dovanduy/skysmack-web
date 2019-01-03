import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { NgAssignmentsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, LanguageService } from '@skysmack/portal-ui';
import { assignmentTypesComponents } from './components/assignment-types-components';
import { assignmentsComponents } from './components/assignments-components';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { recurringAssignmentsComponents } from './components/recurring-assignments-components';
import { maintenanceStatesComponents } from './components/maintenance-states-components';
import { assignmentsAllComponents } from './components/assignments-all-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaintenanceRoutingModule,
    NgAssignmentsModule,
    PortalUiModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    ...assignmentsComponents,
    ...assignmentsAllComponents,
    ...recurringAssignmentsComponents,
    ...assignmentTypesComponents,
    ...maintenanceStatesComponents,
  ],
  providers: []
})
export class MaintenanceModule {
  constructor(
    public languageService: LanguageService,
    public translateService: TranslateService
  ) {
    this.languageService.settingsRedux.getSettings().subscribe(settings => this.translateService.use(settings.language));
  }
}
