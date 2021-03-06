import { Routes } from '@angular/router';
import { RolesIndexComponent } from './roles-index/roles-index.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';
import { ROLES_AREA_KEY } from '@skysmack/packages-identities';
import { RolesSelectComponent } from './roles-select/roles-select.component';
import { RolesSelectFieldComponent } from './roles-select-field/roles-select-field.component';

export const rolesRoutes: Routes = [
  {
    path: ROLES_AREA_KEY, component: RolesIndexComponent,
    children: [
      { path: 'create', component: RolesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: RolesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const rolesComponents: any[] = [
  RolesIndexComponent,
  RolesCreateComponent,
  RolesEditComponent,
  RolesSelectComponent,
  RolesSelectFieldComponent
];
