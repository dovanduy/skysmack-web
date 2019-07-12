import { NgModule } from '@angular/core';
import { Oauth2RoutingModule } from './oauth2-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgOauth2Module } from '@skysmack/ng-packages';
import { PortalUiModule, LanguageService } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';

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
  constructor() { }
}
