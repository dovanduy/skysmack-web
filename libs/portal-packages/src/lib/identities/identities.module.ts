import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { NgIdentitiesModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule, SettingsModule } from '@skysmack/portal-ui';
import { IdentitiesRoutingModule } from './identities-routing.module';
import { identitiesComponents } from './components/identities-components';
import { NgLockoutSettingsFieldsConfig } from './ng-lockout-settings-fields-config';
import { NgUserSettingsFieldsConfig } from './ng-user-settings-fields-config';
import { NgPasswordSettingsFieldsConfig } from './ng-password-settings-fields-config';
import { NgSignInSettingsFieldsConfig } from './ng-sign-in-settings-fields-config';
import { rolesComponents } from './identity-roles/components';
import { usersComponents } from './identity-users/components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    IdentitiesRoutingModule,
    NgIdentitiesModule,
    FieldsModule,
    SettingsModule
  ],
  declarations: [
    ...identitiesComponents,
    ...rolesComponents,
    ...usersComponents
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
  constructor() { }
}
