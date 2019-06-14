import { Routes } from '@angular/router';
import { EmailsIndexComponent } from './emails-index/emails-index.component';

export const emailsRoutes: Routes = [
  {
    path: '', component: EmailsIndexComponent
    // children: [
    // { path: 'create', component: InvoicesCreateComponent, pathMatch: 'full' },
    // { path: 'edit/:id', component: InvoicesEditComponent, pathMatch: 'full' },
    // { path: 'details/:id', component: InvoicesDetailsComponent, pathMatch: 'full' },
    // ]
  }
];

export const emailsComponents: any[] = [
  EmailsIndexComponent
];
