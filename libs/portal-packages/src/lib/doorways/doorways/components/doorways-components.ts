import { Routes } from '@angular/router';
import { DoorwaysIndexComponent } from './doorways-index/doorways-index.component';
import { DoorwaysCreateComponent } from './doorways-create/doorways-create.component';
import { DoorwaysEditComponent } from './doorways-edit/doorways-edit.component';
import { DoorwaysDetailsComponent } from './doorways-details/doorways-details.component';
import { DOORWAYS_AREA_KEY, DOORWAYS_ADDITIONAL_PATHS } from '@skysmack/ng-doorways';
import { DoorwaysDashboardComponent } from './doorways-dashboard/doorways-dashboard.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const doorwaysRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: DoorwaysIndexComponent, children: [
          { path: 'create', component: DoorwaysCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: DoorwaysEditComponent, pathMatch: 'full' },
          { path: 'details/:id', component: DoorwaysDetailsComponent, pathMatch: 'full' },
          {
            path: 'settings/relations', component: SettingsComponent, pathMatch: 'full', data: {
              fieldsConfigToken: 'NgDoorwaysRelationSettingsFieldsConfig'
            } as RouteData
          }
        ]
      },
      getFieldsRoutes(DOORWAYS_AREA_KEY, DOORWAYS_ADDITIONAL_PATHS)
    ]
  }
];

export const doorwaysComponents: any[] = [
  DoorwaysIndexComponent,
  DoorwaysCreateComponent,
  DoorwaysEditComponent,
  DoorwaysDetailsComponent,
  DoorwaysDashboardComponent
];

export const doorwaysEntryComponents: any[] = [
  DoorwaysDashboardComponent
]
