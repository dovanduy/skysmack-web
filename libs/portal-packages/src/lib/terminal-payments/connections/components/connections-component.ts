import { ConnectionsIndexComponent } from './connections-index/connections-index.component';
import { ConnectionsCreateComponent } from './connections-create/connections-create.component';
import { ConnectionsEditComponent } from './connections-edit/connections-edit.component';
import { Routes } from '@angular/router';

export const connectionsRoutes: Routes = [
  {
    path: 'connections', component: ConnectionsIndexComponent, children: [
      { path: 'edit/:id', component: ConnectionsEditComponent, pathMatch: 'full' },
      { path: 'create', component: ConnectionsCreateComponent, pathMatch: 'full' },
    ]
  }
];

export const connectionsComponents: any[] = [
  ConnectionsIndexComponent,
  ConnectionsEditComponent,
  ConnectionsCreateComponent
];
