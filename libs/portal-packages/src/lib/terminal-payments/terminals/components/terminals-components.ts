import { Routes } from '@angular/router';
import { TerminalsIndexComponent } from './terminals-index/terminals-index.component';
import { TerminalsCreateComponent } from './terminals-create/terminals-create.component';
import { TerminalsEditComponent } from './terminals-edit/terminals-edit.component';

export const terminalsRoutes: Routes = [
  {
    path: '', component: TerminalsIndexComponent,
    children: [
      { path: 'create', component: TerminalsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalsEditComponent, pathMatch: 'full' }
    ]
  }
];

export const terminalsComponents: any[] = [
  TerminalsIndexComponent,
  TerminalsCreateComponent,
  TerminalsEditComponent
];
