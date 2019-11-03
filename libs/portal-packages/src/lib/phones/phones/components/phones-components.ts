import { Routes } from '@angular/router';
import { RouteData } from '@skysmack/framework';
import { SettingsComponent } from '@skysmack/portal-settings';
import { PhonesIndexComponent } from './phones-index/phones-index.component';
import { PhonesCreateComponent } from './phones-create/phones-create.component';
import { PhonesEditComponent } from './phones-edit/phones-edit.component';

export const phonesRoutes: Routes = [
  {
    path: '', component: PhonesIndexComponent, children: [
      { path: 'create', component: PhonesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PhonesEditComponent, pathMatch: 'full' },
      {
        path: 'settings/call-data', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgCallDataSettingsFieldsConfig'
        } as RouteData
      },
    ],
  }
];

export const phonesComponents: any[] = [
  PhonesIndexComponent,
  PhonesCreateComponent,
  PhonesEditComponent
];
