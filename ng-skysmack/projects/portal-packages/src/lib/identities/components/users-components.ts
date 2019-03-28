import { Routes } from '@angular/router';
import { UsersIndexComponent } from './users-index/users-index.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { UsersRolesComponent } from './users-roles/users-roles.component';
import { USERS_AREA_KEY } from '@skysmack/packages-identities';

export const usersRoutes: Routes = [
  {
    path: USERS_AREA_KEY, component: UsersIndexComponent,
    children: [
      { path: 'create', component: UsersCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: UsersEditComponent, pathMatch: 'full' },
      { path: 'edit/set-password/:id', component: SetPasswordComponent, pathMatch: 'full' },
      { path: 'edit/roles/:id', component: UsersRolesComponent, pathMatch: 'full' }
    ]
  }
];

export const usersComponents: any[] = [
  UsersIndexComponent,
  UsersCreateComponent,
  UsersEditComponent,
  UsersRolesComponent,
  SetPasswordComponent
];
