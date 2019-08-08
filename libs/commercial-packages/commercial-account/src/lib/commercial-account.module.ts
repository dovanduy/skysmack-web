import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialAccountRoutingModule } from './commercial-account-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { commercialAccountComponents } from './components/commercial-account-components';
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
    CommercialAccountRoutingModule
  ],
  declarations: [
    ...commercialAccountComponents
  ],
  providers: []
})
export class CommercialAccountModule {
  constructor() { }
}
