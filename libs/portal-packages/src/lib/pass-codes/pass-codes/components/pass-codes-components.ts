import { Routes } from '@angular/router';
import { PassCodesIndexComponent } from './pass-codes-index/pass-codes-index.component';
import { PassCodesCreateComponent } from './pass-codes-create/pass-codes-create.component';
import { PassCodesEditComponent } from './pass-codes-edit/pass-codes-edit.component';
import { PassCodesDetailsComponent } from './pass-codes-details/pass-codes-details.component';
import { PASS_CODES_AREA_KEY, PASS_CODES_ADDITIONAL_PATHS } from '@skysmack/packages-pass-codes';
import { PassCodesDashboardComponent } from './pass-codes-dashboard/pass-codes-dashboard.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const passCodesRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: PassCodesIndexComponent, children: [
          { path: 'create', component: PassCodesCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: PassCodesEditComponent, pathMatch: 'full' },
          {
            path: 'settings/limits', component: SettingsComponent, pathMatch: 'full', data: {
              fieldsConfigToken: 'NgPassCodeLimitSettingsFieldsConfig'
            } as RouteData
          }
        ]
      },
      getFieldsRoutes(PASS_CODES_AREA_KEY, PASS_CODES_ADDITIONAL_PATHS)
    ]
  }
];

export const passCodesComponents: any[] = [
  PassCodesIndexComponent,
  PassCodesCreateComponent,
  PassCodesEditComponent,
  PassCodesDetailsComponent,
  PassCodesDashboardComponent
];

export const passCodesEntryComponents: any[] = [
  PassCodesDetailsComponent,
  PassCodesDashboardComponent
]
