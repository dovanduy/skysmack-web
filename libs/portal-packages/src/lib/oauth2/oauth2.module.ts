import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { OAuth2RoutingModule } from './oauth2-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgOAuth2Module } from '@skysmack/ng-oauth2';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { CoalescingComponentFactoryResolver } from '@skysmack/ng-framework';
import { LoginWrapperComponent } from './components/login-wrapper/login-wrapper.component';
import { NgOAuth2MenuProvider } from './ng-oauth2-menu-provider';
import { MatCardModule } from '@angular/material/card';

const material = [
  MatCardModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PortalFieldsModule,
    NgOAuth2Module,
    OAuth2RoutingModule,
    ...material
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
export class OAuth2Module {
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
