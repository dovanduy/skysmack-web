import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgLodgingsModule } from '@skysmack/ng-lodgings';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { lodgingsComponents } from './lodgings/components/lodgings-components';
import { lodgingTypesComponents } from './lodging-types/components/lodging-types-component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgLodgingSettingsFieldsConfig } from './ng-lodging-settings-fields-config';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { SettingsModule } from '@skysmack/portal-settings';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { NgLodgingsMenuProvider } from './lodgings/ng-lodgings-menu-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgLodgingsModule,
    PortalUiModule,
    DynamicFormsModule,
    LodgingsRoutingModule,
    PortalFieldsModule,
    SettingsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  exports: [],
  declarations: [
    ...lodgingsComponents,
    ...lodgingTypesComponents
  ],
  providers: [
    { provide: 'NgLodgingSettingsFieldsConfig', useClass: NgLodgingSettingsFieldsConfig }
  ]
})
export class LodgingsModule {
  constructor(
    ngMenuProviders: NgMenuProviders,
    ngLodgingsMenuProvider: NgLodgingsMenuProvider,

  ) {
    ngMenuProviders
      .add(ngLodgingsMenuProvider)
  }
}
