import { Routes } from '@angular/router';
import { FieldsIndexComponent, FieldsCreateComponent, FieldsEditComponent } from '@skysmack/portal-fields';
import { TERMINAL_RECEIPTS_AREA_KEY } from '@skysmack/packages-terminal-payments';
import { TerminalReceiptsIndexComponent } from './terminal-receipts-index/terminal-receipts-index.component';
import { TerminalReceiptsCreateComponent } from './terminal-receipts-create/terminal-receipts-create.component';
import { TerminalReceiptsEditComponent } from './terminal-receipts-edit/terminal-receipts-edit.component';

export const terminalReceiptsRoutes: Routes = [
  {
    path: '', component: TerminalReceiptsIndexComponent,
    children: [
      { path: 'create', component: TerminalReceiptsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalReceiptsEditComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'fields', component: FieldsIndexComponent, children: [
      { path: 'create', component: FieldsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: FieldsEditComponent, pathMatch: 'full' }
    ], data: {
      areaKey: TERMINAL_RECEIPTS_AREA_KEY
    }
  }
];

export const terminalReceiptsComponents: any[] = [
  TerminalReceiptsIndexComponent,
  TerminalReceiptsCreateComponent,
  TerminalReceiptsEditComponent
];

export const terminalReceiptsEntryComponents: any[] = [
]
