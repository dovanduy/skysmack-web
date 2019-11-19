import { Routes } from '@angular/router';
import { WebhooksIndexComponent } from './webhooks-index/webhooks-index.component';
import { WebhooksCreateComponent } from './webhooks-create/webhooks-create.component';
import { WebhooksEditComponent } from './webhooks-edit/webhooks-edit.component';

export const webhooksRoutes: Routes = [
  {
    path: '', component: WebhooksIndexComponent,
    children: [
      { path: 'create', component: WebhooksCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: WebhooksEditComponent, pathMatch: 'full' },
    ]
  }
];

export const webhooksComponents: any[] = [
  WebhooksIndexComponent,
  WebhooksCreateComponent,
  WebhooksEditComponent,
];

export const webhooksEntryComponents = [
];
