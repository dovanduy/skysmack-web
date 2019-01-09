import { Routes } from '@angular/router';
import { UsersIndexComponent } from './users-index/users-index.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

export const usersRoutes: Routes = [
  {
    path: 'users', component: UsersIndexComponent,
    children: [
      { path: 'create', component: UsersCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: UsersEditComponent, pathMatch: 'full' }
    ]
  }
];

export const usersComponents: any[] = [
  UsersIndexComponent,
  UsersCreateComponent,
  UsersEditComponent
];
