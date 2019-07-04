import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgLodgingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule, SettingsModule } from '@skysmack/portal-ui';
import { lodgingsComponents } from './lodgings/components/lodgings-components';
import { lodgingTypesComponents } from './lodging-types/components/lodging-types-component';
import { LanguageService } from '@skysmack/portal-ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgLodgingSettingsFieldsConfig } from './ng-lodging-settings-fields-config';
import { NgDynamicFormsModule } from '@skysmack/ng-dynamic-forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgLodgingsModule,
    PortalUiModule,
    NgDynamicFormsModule,
    LodgingsRoutingModule,
    FieldsModule,
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
    LanguageService,
    { provide: 'NgLodgingSettingsFieldsConfig', useClass: NgLodgingSettingsFieldsConfig }
  ]
})
export class LodgingsModule {
  constructor(
    public languageService: LanguageService
  ) { }
}
