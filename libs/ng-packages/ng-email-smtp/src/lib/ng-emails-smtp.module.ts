import { NgModule } from '@angular/core';
import { NgMenuItemProviders } from '@skysmack/ng-framework';
import { NgEmailsSmtpMenuItemProvider } from './ng-emails-smtp-menu-item-provider';

@NgModule({
  imports: [],
  exports: [],
  providers: []
})
export class NgEmailsSmtpModule {
  constructor(
    ngMenuItemProviders: NgMenuItemProviders,
    menuItemProvider: NgEmailsSmtpMenuItemProvider
  ) {
    ngMenuItemProviders.add(menuItemProvider);
  }
}
