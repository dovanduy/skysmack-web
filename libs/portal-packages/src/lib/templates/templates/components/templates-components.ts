import { Routes } from '@angular/router';
import { TemplatesIndexComponent } from './templates-index/templates-index.component';
import { TemplatesCreateComponent } from './templates-create/templates-create.component';
import { TemplatesEditComponent } from './templates-edit/templates-edit.component';
import { getFieldsRoutes } from '@skysmack/portal-fields';
import { TEMPLATES_ADDITIONAL_PATHS, TEMPLATES_AREA_KEY } from '@skysmack/packages-templates';

export const templatesRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: TemplatesIndexComponent,
        children: [
          { path: 'create', component: TemplatesCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: TemplatesEditComponent, pathMatch: 'full' }
        ]
      },
      getFieldsRoutes(TEMPLATES_AREA_KEY, TEMPLATES_ADDITIONAL_PATHS)
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
