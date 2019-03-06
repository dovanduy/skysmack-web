import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { NgIdentitiesModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule } from '@skysmack/portal-ui';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { IdentitiesRoutingModule } from './identities-routing.module';
import { identitiesComponents } from './components/identities-components';
import { rolesComponents, usersComponents } from './components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    IdentitiesRoutingModule,
    NgIdentitiesModule,
    FieldsModule
  ],
  declarations: [
    ...identitiesComponents,
    ...rolesComponents,
    ...usersComponents
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
export class IdentitiesModule {
  constructor(public languageService: LanguageService) { }
}
