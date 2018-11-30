import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgLodgingsModule } from './../../ng-packages/lodgings';
import { PortalUiModule } from 'lib/portal-ui/portal-ui.module';
import { lodgingsComponents } from './components/lodgings-components';

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
    ...lodgingsComponents
  ],
  providers: [],
})
export class LodgingsModule { }
