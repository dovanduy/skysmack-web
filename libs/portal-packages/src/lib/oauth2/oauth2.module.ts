import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { Oauth2RoutingModule } from './oauth2-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgOauth2Module } from '@skysmack/ng-packages';
import { PortalUiModule, LanguageService, NgMenuProviders } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { NgOAuth2Menu } from './ng-oauth2-menu';
import { LoginWrapperComponent } from './components/login-wrapper/login-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule,
    Oauth2RoutingModule,
    NgOauth2Module
  ],
  declarations: [
    LoginComponent,
    LoginWrapperComponent
  ],
  entryComponents: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LanguageService
  ]
})
export class Oauth2Module {
  constructor(
    ngMenuProviders: NgMenuProviders,
    menu: NgOAuth2Menu,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(menu);
  }
}
