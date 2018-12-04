import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginFieldsConfig } from './login-fields-config';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgAuthenticationModule } from 'lib/ng-packages/authentication/ng-authentication-module';
import { PortalUiModule } from 'lib/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    NgAuthenticationModule,
    PortalUiModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginFieldsConfig
  ]
})
export class AuthenticationModule { }
