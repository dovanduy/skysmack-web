import { Routes } from '@angular/router';
import { AxisPhysicalAccessControlIndexComponent } from './axis-physical-access-control-index/axis-physical-access-control-index.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const axisPhysicalAccessControlRoutes: Routes = [
  {
    path: '', component: AxisPhysicalAccessControlIndexComponent,
    children: [
      {
        path: 'settings/connection', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgAxisPhysicalAccessControlSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const axisPhysicalAccessControlComponents: any[] = [
  AxisPhysicalAccessControlIndexComponent,
];

export const axisPhysicalAccessControlEntryComponents = [
];
