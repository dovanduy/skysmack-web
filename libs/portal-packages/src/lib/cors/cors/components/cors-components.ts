import { Routes } from '@angular/router';
import { CorsIndexComponent } from './cors-index/cors-index.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const corsRoutes: Routes = [
  {
    path: '', component: CorsIndexComponent,
    children: [
      {
        path: 'settings', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgCorsSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const corsComponents: any[] = [
  CorsIndexComponent,
];

export const corsEntryComponents = [
];
