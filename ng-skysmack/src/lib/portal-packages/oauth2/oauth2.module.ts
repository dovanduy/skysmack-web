import { NgModule } from '@angular/core';
import { Oauth2RoutingModule } from './oauth2-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgOauth2Module } from 'lib/ng-packages/oauth2/ng-oauth2.module';
import { PortalUiModule } from 'lib/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    Oauth2RoutingModule,
    NgOauth2Module,
    PortalUiModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: []
})
export class Oauth2Module { }
