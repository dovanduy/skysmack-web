import { Routes } from '@angular/router';
import { AccessPolicyRulesIndexComponent } from './access-policy-rules-index/access-policy-rules-index.component';
import { AccessPolicyRulesCreateComponent } from './access-policy-rules-create/access-policy-rules-create.component';
import { AccessPolicyRulesEditComponent } from './access-policy-rules-edit/access-policy-rules-edit.component';

export const accessPolicyRulesRoutes: Routes = [
  {
    path: 'rules', component: AccessPolicyRulesIndexComponent,
    children: [
      { path: 'create', component: AccessPolicyRulesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: AccessPolicyRulesEditComponent, pathMatch: 'full' }
    ]
  }
];

export const accessPolicyRulesComponents: any[] = [
  AccessPolicyRulesIndexComponent,
  AccessPolicyRulesCreateComponent,
  AccessPolicyRulesEditComponent
];
