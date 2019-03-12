import { Routes } from '@angular/router';
import { IdentitiesIndexComponent } from './identities-index/identities-index.component';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-ui';

export const identitiesRoutes: Routes = [
  {
    path: '', component: IdentitiesIndexComponent,
    children: [
      {
        path: 'settings/lockout', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgLockoutSettingsFieldsConfig'
        } as RouteData
      },
      {
        path: 'settings/user', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgUserSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const identitiesComponents: any[] = [
  IdentitiesIndexComponent
];
