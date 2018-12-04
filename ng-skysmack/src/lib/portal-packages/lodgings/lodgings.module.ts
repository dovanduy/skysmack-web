import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgLodgingsModule } from './../../ng-packages/lodgings';
import { PortalUiModule } from 'lib/portal-ui/portal-ui.module';
import { lodgingsComponents } from './components/lodgings-components';
import { lodgingTypesComponents } from './components/lodging-types-component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LodgingsRoutingModule,
    NgLodgingsModule,
    PortalUiModule
  ],
  exports: [],
  declarations: [
    ...lodgingsComponents,
    ...lodgingTypesComponents
  ],
  providers: [],
})
export class LodgingsModule { }
