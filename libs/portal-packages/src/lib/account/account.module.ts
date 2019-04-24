import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LanguageService } from '@skysmack/portal-ui';
import { NgAccountModule } from '@skysmack/ng-packages';
import { AccountRoutingModule } from './account-routing.module';
import { accountsComponents } from './accounts/components/accounts-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    AccountRoutingModule,
    NgAccountModule,
  ],
  exports: [],
  declarations: [
    ...accountsComponents
  ],
  providers: [
    LanguageService
  ]
})
export class AccountModule {
  constructor() { }
}
