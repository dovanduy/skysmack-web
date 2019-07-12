import { Routes } from '@angular/router';
import { AccessPolicyPermissionsIndexComponent } from './access-policy-permissions-index/access-policy-permissions-index.component';
import { AccessPolicyPermissionsCreateComponent } from './access-policy-permissions-create/access-policy-permissions-create.component';
import { AccessPolicyPermissionsEditComponent } from './access-policy-permissions-edit/access-policy-permissions-edit.component';

export const accessPolicyPermissionsRoutes: Routes = [
  {
    path: 'permissions', component: AccessPolicyPermissionsIndexComponent,
    children: [
      { path: 'create', component: AccessPolicyPermissionsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: AccessPolicyPermissionsEditComponent, pathMatch: 'full' }
    ]
  }
];

export const accessPolicyPermissionsComponents: any[] = [
  AccessPolicyPermissionsIndexComponent,
  AccessPolicyPermissionsCreateComponent,
  AccessPolicyPermissionsEditComponent
];
