import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { NgIdentitiesModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
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
import { NgSettingsModule } from '@skysmack/ng-settings';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    IdentitiesRoutingModule,
    NgIdentitiesModule,
    FieldsModule,
    NgSettingsModule,
    MatSelectModule
  ],
  declarations: [
    ...identitiesComponents,
    ...rolesComponents,
    ...usersComponents,
    ...accountsComponents
  ],
  exports: [
    RolesSelectComponent,
    RolesSelectFieldComponent
  ],
  entryComponents: [
    RolesSelectFieldComponent
  ],
  providers: [
    LanguageService,
    { provide: 'NgLockoutSettingsFieldsConfig', useClass: NgLockoutSettingsFieldsConfig },
    { provide: 'NgUserSettingsFieldsConfig', useClass: NgUserSettingsFieldsConfig },
    { provide: 'NgPasswordSettingsFieldsConfig', useClass: NgPasswordSettingsFieldsConfig },
    { provide: 'NgSignInSettingsFieldsConfig', useClass: NgSignInSettingsFieldsConfig }
  ]
})
export class IdentitiesModule {
  constructor(
    // Make entry components available
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver
  ) {
    // Make entry components available
    coalescingResolver.registerResolver(localResolver);
  }
}
