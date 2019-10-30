import { Routes } from '@angular/router';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-settings';
import { PBX_3CXIndexComponent } from './3cx-index/3cx-index.component';

export const pbx_3cxRoutes: Routes = [
  {
    path: '', component: PBX_3CXIndexComponent, children: [
      {
        path: 'settings/call-data', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgCallDataSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const pbx_3CXComponents: any[] = [
  PBX_3CXIndexComponent
];
