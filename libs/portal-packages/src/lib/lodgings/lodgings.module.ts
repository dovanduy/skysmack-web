import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgLodgingsModule } from '@skysmack/ng-lodgings';
import { PortalUiModule, NgMenuProviders } from '@skysmack/portal-ui';
import { lodgingsComponents } from './lodgings/components/lodgings-components';
import { lodgingTypesComponents } from './lodging-types/components/lodging-types-component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from './date-fns-v2-adaptor';
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
    // Note: Below setup works with ng-packgr (running ng build portal-ui)
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
<<<<<<< HEAD
    .add(ngLodgingsMenuProvider)
   }
=======
      .add(ngLodgingsMenuProvider)
      .add(ngLodgingsAvailabilityMenuProvider)
      .add(ngLodgingTypesMenuProvider)
      .add(ngLodgingTypesAvailabilityMenuProvider)
  }
>>>>>>> dev
}
