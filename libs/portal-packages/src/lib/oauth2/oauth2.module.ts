import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { Oauth2RoutingModule } from './oauth2-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgOauth2Module } from '@skysmack/ng-oauth2';
import { PortalUiModule, LanguageService, NgMenuProviders } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { LoginWrapperComponent } from './components/login-wrapper/login-wrapper.component';
import { NgOAuth2MenuProvider } from './ng-oauth2-menu-provider';
import { RefreshTokenInterceptor } from '@skysmack/ng-oauth2';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule,
    NgOauth2Module,
    Oauth2RoutingModule
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
  providers: []
})
export class Oauth2Module {
  constructor(
    ngMenuProviders: NgMenuProviders,
    menu: NgOAuth2MenuProvider,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver,
  ) {
    coalescingResolver.registerResolver(localResolver);
    ngMenuProviders.add(menu);
  }
}
