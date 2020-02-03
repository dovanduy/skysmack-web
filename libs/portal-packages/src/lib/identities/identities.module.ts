import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgMenuProviders } from '@skysmack/portal-ui';

import { NgIdentitiesModule } from '@skysmack/ng-identities';
import { PortalUiModule } from '@skysmack/portal-ui';
import { IdentitiesRoutingModule } from './identities-routing.module';
import { NgLockoutSettingsFieldsConfig } from './ng-lockout-settings-fields-config';
import { NgUserSettingsFieldsConfig } from './ng-user-settings-fields-config';
import { NgPasswordSettingsFieldsConfig } from './ng-password-settings-fields-config';
import { NgSignInSettingsFieldsConfig } from './ng-sign-in-settings-fields-config';
import { identitiesComponents } from './components/identities-components';
import { rolesComponents } from './identity-roles/components/roles-components';
import { usersComponents } from './identity-users/components/users-components';
import { accountsComponents } from './accounts/components/accounts-components';
import { MatSelectModule } from '@angular/material/select';
import { RolesSelectFieldComponent } from './identity-roles/components/roles-select-field/roles-select-field.component';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { RolesSelectComponent } from './identity-roles';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { SettingsModule } from '@skysmack/portal-settings';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { applicationsComponents } from './identity-applications/components/applications-components';
import { NgIdentitiesMenuProvider } from './ng-identities-menu-provider';
import { clientsComponents } from './clients/components/clients-component';
import { NgEmailSettingsFieldsConfig } from './ng-email-settings-fields-config';
import { NgTemplatePackageSettingsFieldsConfig } from './ng-template-package-settings-fields-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    IdentitiesRoutingModule,
    NgIdentitiesModule,
    PortalFieldsModule,
    SettingsModule,
    MatSelectModule
  ],
  declarations: [
    ...identitiesComponents,
    ...rolesComponents,
    ...usersComponents,
    ...accountsComponents,
    ...applicationsComponents,
    ...clientsComponents,
  ],
  exports: [
    RolesSelectComponent,
    RolesSelectFieldComponent
  ],
  entryComponents: [
    RolesSelectFieldComponent
  ],
  providers: [
    { provide: 'NgLockoutSettingsFieldsConfig', useClass: NgLockoutSettingsFieldsConfig },
    { provide: 'NgUserSettingsFieldsConfig', useClass: NgUserSettingsFieldsConfig },
    { provide: 'NgPasswordSettingsFieldsConfig', useClass: NgPasswordSettingsFieldsConfig },
    { provide: 'NgSignInSettingsFieldsConfig', useClass: NgSignInSettingsFieldsConfig },
    { provide: 'NgEmailSettingsFieldsConfig', useClass: NgEmailSettingsFieldsConfig },
    { provide: 'NgTemplatePackageSettingsFieldsConfig', useClass: NgTemplatePackageSettingsFieldsConfig }
  ]
})
export class IdentitiesModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngIdentitiesMenuProvider: NgIdentitiesMenuProvider,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(ngIdentitiesMenuProvider);
  }
}
