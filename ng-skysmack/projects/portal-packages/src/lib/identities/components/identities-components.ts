import { Routes } from '@angular/router';
import { IdentitiesIndexComponent } from './identities-index/identities-index.component';
import { IdentitiesSettingsComponent } from './identities-settings/identities-settings.component';

export const identitiesRoutes: Routes = [
  {
    path: '', component: IdentitiesIndexComponent,
    children: [
      { path: 'settings', component: IdentitiesSettingsComponent, pathMatch: 'full' },
    ]
  }
];

export const identitiesComponents: any[] = [
  IdentitiesIndexComponent,
  IdentitiesSettingsComponent
];
