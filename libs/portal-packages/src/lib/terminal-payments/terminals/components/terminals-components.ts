import { Routes } from '@angular/router';
import { TerminalsIndexComponent } from './terminals-index/terminals-index.component';
import { TerminalsCreateComponent } from './terminals-create/terminals-create.component';
import { TerminalsEditComponent } from './terminals-edit/terminals-edit.component';
import { FieldsIndexComponent, FieldsCreateComponent } from '@skysmack/portal-ui';
import { TERMINALS_AREA_KEY } from '@skysmack/packages-terminal-payments';


export const terminalsRoutes: Routes = [
  {
    path: '', component: TerminalsIndexComponent,
    children: [
      { path: 'create', component: TerminalsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalsEditComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' }
    ], data: {
      areaKey: TERMINALS_AREA_KEY
    }
  }
];

export const terminalsComponents: any[] = [
  TerminalsIndexComponent,
  TerminalsCreateComponent,
  TerminalsEditComponent
];
