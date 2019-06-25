import { Routes } from '@angular/router';
import { EmailsIndexComponent } from './emails-index/emails-index.component';

export const emailsRoutes: Routes = [
  {
    path: '', component: EmailsIndexComponent
  }
];

export const emailsComponents: any[] = [
  EmailsIndexComponent
];
