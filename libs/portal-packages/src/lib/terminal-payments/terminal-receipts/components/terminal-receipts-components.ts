import { Routes } from '@angular/router';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { TERMINAL_RECEIPTS_AREA_KEY, TERMINAL_RECEIPTS_ADDITIONAL_PATHS } from '@skysmack/packages-terminal-payments';
import { TerminalReceiptsIndexComponent } from './terminal-receipts-index/terminal-receipts-index.component';
import { TerminalReceiptsCreateComponent } from './terminal-receipts-create/terminal-receipts-create.component';
import { TerminalReceiptsEditComponent } from './terminal-receipts-edit/terminal-receipts-edit.component';

export const terminalReceiptsRoutes: Routes = [
  {
    path: 'receipts', component: TerminalReceiptsIndexComponent,
    children: [
      { path: 'create', component: TerminalReceiptsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TerminalReceiptsEditComponent, pathMatch: 'full' },
    ]
  },
  getFieldsRoutes(TERMINAL_RECEIPTS_AREA_KEY, TERMINAL_RECEIPTS_ADDITIONAL_PATHS, ['receipts']),
];

export const terminalReceiptsComponents: any[] = [
  TerminalReceiptsIndexComponent,
  TerminalReceiptsCreateComponent,
  TerminalReceiptsEditComponent
];

export const terminalReceiptsEntryComponents: any[] = [
]
