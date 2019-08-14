import { ClientsIndexComponent } from './clients-index/clients-index.component';
import { ClientsCreateComponent } from './clients-create/clients-create.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';
import { Routes } from '@angular/router';

export const clientsRoutes: Routes = [
  {
    path: 'clients', component: ClientsIndexComponent, children: [
      { path: 'edit/:id', component: ClientsEditComponent, pathMatch: 'full' },
      { path: 'create', component: ClientsCreateComponent, pathMatch: 'full' },
    ]
  }
];

export const clientsComponents: any[] = [
  ClientsIndexComponent,
  ClientsEditComponent,
  ClientsCreateComponent
];
