import { Routes } from '@angular/router';
import { IdentitiesIndexComponent } from './identities-index/identities-index.component';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-ui';

const data = {
  fieldsConfigToken: 'NgLockoutSettingsFieldsConfig'
} as RouteData;

export const identitiesRoutes: Routes = [
  {
    path: '', component: IdentitiesIndexComponent,
    children: [
      { path: 'settings/lockout', component: SettingsComponent, pathMatch: 'full', data }
    ]
  }
];

export const identitiesComponents: any[] = [
  IdentitiesIndexComponent
];
