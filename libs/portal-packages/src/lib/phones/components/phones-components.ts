import { Routes } from '@angular/router';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-settings';
import { PhonesIndexComponent } from './phones-index/phones-index.component';

export const phonesRoutes: Routes = [
  {
    path: '', component: PhonesIndexComponent, children: [
      {
        path: 'settings/call-data', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgCallDataSettingsFieldsConfig'
        } as RouteData
      },
    ],
  }
];

export const phonesComponents: any[] = [
  PhonesIndexComponent
];
