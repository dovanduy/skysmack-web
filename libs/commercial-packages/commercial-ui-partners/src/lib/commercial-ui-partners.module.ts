import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { commercialUiPartnersComponents } from './components/commercial-ui-partners-components';
import { MaterialModule } from '@skysmack/portal-ui';
import { NgTranslationModule } from '@skysmack/ng-translation';
import { RouterModule } from '@angular/router';
import { NgMenuProviders } from './navigation/ng-menu-providers';
import { NgUiMenuProvider } from '../ng-ui-menu-provider';
import { RemoveDialog } from './components/remove-dialog/remove-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NgTranslationModule,
  ],
  entryComponents: [
    RemoveDialog
  ],
  declarations: [
    ...commercialUiPartnersComponents
  ],
  providers: []
})
export class CommercialUiPartnersModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngUiMenuProvider: NgUiMenuProvider
  ) {
    ngMenuProviders.add(ngUiMenuProvider);
  }
}
