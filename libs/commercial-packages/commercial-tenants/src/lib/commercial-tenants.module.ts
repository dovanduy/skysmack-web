import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialTenantsRoutingModule } from './commercial-tenants-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialTenantsComponents } from './components/commercial-tenants-components';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';
import { MaterialModule } from '@skysmack/portal-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgDynamicFormsModule,
    DynamicFormsModule,
    PortalFieldsModule,
    MaterialModule,
    CommercialTenantsRoutingModule
  ],
  declarations: [
    ...commercialTenantsComponents
  ],
  providers: []
})
export class CommercialTenantsModule {
  constructor() { }
}
