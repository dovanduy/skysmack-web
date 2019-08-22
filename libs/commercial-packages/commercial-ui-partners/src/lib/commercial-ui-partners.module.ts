import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { commercialUiPartnersComponents } from './components/commercial-ui-partners-components';
import { MaterialModule } from '@skysmack/portal-ui';
import { NgTranslationModule, LanguageService } from '@skysmack/ng-translation';
import { RouterModule } from '@angular/router';
import { NgMenuProviders } from './navigation/ng-menu-providers';
import { NgUiMenuProvider } from '../ng-ui-menu-provider';
import { RemoveDialog } from './components/remove-dialog/remove-dialog.component';
import { NgFrameworkModule } from '@skysmack/ng-framework';
import { CookieConsentComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NgFrameworkModule,
    NgTranslationModule,
  ],
  entryComponents: [
    RemoveDialog
  ],
  declarations: [
    ...commercialUiPartnersComponents
  ],
  exports: [
    CookieConsentComponent
  ],
  providers: [
    LanguageService
  ]
})
export class CommercialUiPartnersModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngUiMenuProvider: NgUiMenuProvider
  ) {
    ngMenuProviders.add(ngUiMenuProvider);
  }
}
