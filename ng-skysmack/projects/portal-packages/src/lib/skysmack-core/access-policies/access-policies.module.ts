import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PortalUiModule, HttpLoaderFactory, DynamicFieldsModule } from '@skysmack/portal-ui';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { AccessPoliciesRoutingModule } from './access-policies-routing.module';
import { NgAccessPoliciesModule } from '@skysmack/ng-packages';
import { accessPolicyPermissionsComponents } from './components/access-policy-permissions-components';
import { accessPolicyRolesComponents } from './components/access-policy-roles-components';
import { accessPolicyRulesComponents } from './components/access-policy-rules-components';
import { accessPoliciesComponents } from './components/access-policies-components';
import { IdentitiesModule } from '../../identities';
import { PackagesModule } from '../../packages';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    AccessPoliciesRoutingModule,
    NgAccessPoliciesModule,
    DynamicFieldsModule,
    IdentitiesModule,
    PackagesModule
  ],
  declarations: [
    ...accessPolicyPermissionsComponents,
    ...accessPolicyRolesComponents,
    ...accessPolicyRulesComponents,
    ...accessPoliciesComponents
  ],
  providers: [
    LanguageService,
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  ]
})
export class AccessPoliciesModule {
  constructor(public languageService: LanguageService) { }
}
