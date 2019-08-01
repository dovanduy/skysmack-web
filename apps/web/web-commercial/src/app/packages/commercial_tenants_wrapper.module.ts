import { NgModule } from '@angular/core';
import { CommercialTenantsModule } from './../../../../../../libs/commercial-packages/commercial-tenants/src/lib/commercial-tenants.module';
import { Route } from '@angular/router';

@NgModule({
  imports: [
    CommercialTenantsModule
  ]
})
export class CommercialTenantsWrapperModule { }

export const commercialTenantsRoute = { path: 'tenants', loadChildren: './packages/commercial_tenants_wrapper.module#CommercialTenantsWrapperModule' } as Route;