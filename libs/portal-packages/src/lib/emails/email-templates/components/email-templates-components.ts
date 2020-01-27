import { Routes } from '@angular/router';
import { EmailTemplatesIndexComponent } from './email-templates-index/email-templates-index.component';
import { EmailTemplatesCreateComponent } from './email-templates-create/email-templates-create.component';
import { EmailTemplatesEditComponent } from './email-templates-edit/email-templates-edit.component';
import { EmailTemplatesDetailsComponent } from './email-templates-details/email-templates-details.component';

export const emailTemplatesRoutes: Routes = [
  {
    path: 'templates', component: EmailTemplatesIndexComponent,
    children: [
      { path: 'create', component: EmailTemplatesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: EmailTemplatesEditComponent, pathMatch: 'full' },
    ]
  }
];

export const emailTemplatesComponents: any[] = [
  EmailTemplatesIndexComponent,
  EmailTemplatesCreateComponent,
  EmailTemplatesEditComponent,
  EmailTemplatesDetailsComponent
];

export const emailTemplatesEntryComponents: any[] = [
  EmailTemplatesDetailsComponent
];
