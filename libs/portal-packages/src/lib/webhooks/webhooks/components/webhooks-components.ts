import { Routes } from '@angular/router';
import { WebhooksIndexComponent } from './webhooks-index/webhooks-index.component';
import { WebhooksCreateComponent } from './webhooks-create/webhooks-create.component';
import { WebhooksEditComponent } from './webhooks-edit/webhooks-edit.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const webhooksRoutes: Routes = [
  {
    path: '', component: WebhooksIndexComponent,
    children: [
      { path: 'create', component: WebhooksCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: WebhooksEditComponent, pathMatch: 'full' },
      {
        path: 'settings', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgWebhookSettingsFieldsConfig'
        } as RouteData
      }
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
