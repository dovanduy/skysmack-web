import { Routes } from '@angular/router';
import { AccessPolicyRolesIndexComponent } from './access-policy-roles-index/access-policy-roles-index.component';
import { AccessPolicyRolesCreateComponent } from './access-policy-roles-create/access-policy-roles-create.component';
import { AccessPolicyRolesEditComponent } from './access-policy-roles-edit/access-policy-roles-edit.component';
import { ROLES_AREA_KEY } from '@skysmack/packages-identities/lib/constants/constants';

export const accessPolicyRolesRoutes: Routes = [
  {
    path: ROLES_AREA_KEY, component: AccessPolicyRolesIndexComponent,
    children: [
      { path: 'create', component: AccessPolicyRolesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: AccessPolicyRolesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const accessPolicyRolesComponents: any[] = [
  AccessPolicyRolesIndexComponent,
  AccessPolicyRolesCreateComponent,
  AccessPolicyRolesEditComponent
];
