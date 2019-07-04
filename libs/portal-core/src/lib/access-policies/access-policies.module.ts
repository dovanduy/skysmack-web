import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { AccessPoliciesRoutingModule } from './access-policies-routing.module';
import { NgAccessPoliciesModule } from '@skysmack/ng-core';
import { accessPolicyPermissionsComponents } from './access-policy-permissions/components/access-policy-permissions-components';
import { accessPolicyRolesComponents } from './access-policy-roles/components/access-policy-roles-components';
import { accessPolicyRulesComponents } from './access-policy-rules/components/access-policy-rules-components';
import { accessPoliciesComponents } from './components/access-policies-components';
import { FieldPermissionFieldComponent } from './access-policy-roles/components/field-permission-field/field-permission-field.component';
import { IdentitiesModule } from '@skysmack/portal-packages';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
// import { PackagesModule } from '../../packages';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    NgDynamicFormsModule,
    AccessPoliciesRoutingModule,
    NgAccessPoliciesModule,
    FieldsModule,
    IdentitiesModule,
    NgDynamicFormsModule
    // PackagesModule
  ],
  declarations: [
    ...accessPolicyPermissionsComponents,
    ...accessPolicyRolesComponents,
    ...accessPolicyRulesComponents,
    ...accessPoliciesComponents
  ],
  entryComponents: [
    FieldPermissionFieldComponent
  ],
  providers: [
    LanguageService
  ]
})
export class AccessPoliciesModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
