import { Routes } from '@angular/router';
import { TemplatesIndexComponent } from './templates-index/templates-index.component';
import { TemplatesCreateComponent } from './templates-create/templates-create.component';
import { TemplatesEditComponent } from './templates-edit/templates-edit.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const templatesRoutes: Routes = [
  {
    path: '', component: TemplatesIndexComponent,
    children: [
      { path: 'create', component: TemplatesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TemplatesEditComponent, pathMatch: 'full' },
      {
        path: 'settings', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgTemplateSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const templatesComponents: any[] = [
  TemplatesIndexComponent,
  TemplatesCreateComponent,
  TemplatesEditComponent,
];

export const templatesEntryComponents = [
];
