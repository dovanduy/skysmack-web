import { Routes } from '@angular/router';
import { WorkflowsIndexComponent } from './workflows-index/workflows-index.component';
import { WorkflowsCreateComponent } from './workflows-create/workflows-create.component';
import { WorkflowsEditComponent } from './workflows-edit/workflows-edit.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';
import { DefinitionsIndexComponent } from './definitions-index/definitions-index.component';
import { DefinitionsCreateComponent } from './definitions-create/definitions-create.component';

export const workflowsRoutes: Routes = [
  {
    path: '', component: WorkflowsIndexComponent,
    children: [
      { path: 'create', component: WorkflowsCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: WorkflowsEditComponent, pathMatch: 'full' },
      {
        path: 'settings', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgWorkflowSettingsFieldsConfig'
        } as RouteData
      }
    ]    
  },
  {
    path: 'definitions', component: DefinitionsIndexComponent    
  },
  { 
    path: 'definitions/create', component: DefinitionsCreateComponent, pathMatch: 'full'
  }
];

export const workflowsComponents: any[] = [
  WorkflowsIndexComponent,
  WorkflowsCreateComponent,
  WorkflowsEditComponent,
  DefinitionsIndexComponent,
  DefinitionsCreateComponent
];

export const workflowsEntryComponents = [
];
