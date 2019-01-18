import { Routes } from '@angular/router';
import { RolesIndexComponent } from './roles-index/roles-index.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';

export const rolesRoutes: Routes = [
  {
    path: 'roles', component: RolesIndexComponent,
    children: [
      { path: 'create', component: RolesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: RolesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const rolesComponents: any[] = [
  RolesIndexComponent,
  RolesCreateComponent,
  RolesEditComponent
];
