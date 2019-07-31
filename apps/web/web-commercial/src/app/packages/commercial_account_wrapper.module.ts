import { NgModule } from '@angular/core';
import { CommercialAccountModule } from './../../../../../../libs/commercial-packages/commercial-account/src/lib/commercial-account.module';
import { Route } from '@angular/router';

@NgModule({
  imports: [
    CommercialAccountModule
  ]
})
export class CommercialAccountWrapperModule { }

export const commercialAccountRoute = { path: 'account', loadChildren: './packages/commercial_account_wrapper.module#CommercialAccountWrapperModule' } as Route;