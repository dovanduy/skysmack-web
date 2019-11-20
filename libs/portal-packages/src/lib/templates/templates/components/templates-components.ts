import { Routes } from '@angular/router';
import { TemplatesIndexComponent } from './templates-index/templates-index.component';
import { TemplatesCreateComponent } from './templates-create/templates-create.component';
import { TemplatesEditComponent } from './templates-edit/templates-edit.component';

export const templatesRoutes: Routes = [
  {
    path: '', component: TemplatesIndexComponent,
    children: [
      { path: 'create', component: TemplatesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: TemplatesEditComponent, pathMatch: 'full' }
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
