import { Routes } from '@angular/router';
import { TerminalsIndexComponent } from './terminals-index/terminals-index.component';
import { TerminalsCreateComponent } from './terminals-create/terminals-create.component';
import { TerminalsEditComponent } from './terminals-edit/terminals-edit.component';
import { TerminalsPayComponent } from './terminals-pay/terminals-pay.component';
import { TerminalsProcessComponent } from './terminals-process/terminals-process.component';

export const terminalsRoutes: Routes = [
  {
    path: 'terminals', component: TerminalsIndexComponent,
    children: [
      { path: 'create', component: TerminalsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalsEditComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'terminals/:invoiceId', component: TerminalsIndexComponent,
    children: [
      { path: 'pay', component: TerminalsPayComponent, pathMatch: 'full' },
      { path: 'processing', component: TerminalsProcessComponent, pathMatch: 'full' }
    ]
  }
];

export const terminalsComponents: any[] = [
  TerminalsIndexComponent,
  TerminalsCreateComponent,
  TerminalsEditComponent,
  TerminalsPayComponent,
  TerminalsProcessComponent
];
