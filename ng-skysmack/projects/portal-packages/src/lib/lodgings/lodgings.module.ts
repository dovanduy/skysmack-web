import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LodgingsRoutingModule } from './lodgings-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgLodgingsModule } from '@skysmack/ng-packages';
import { PortalUiModule, HttpLoaderFactory, FieldsModule, SettingsModule } from '@skysmack/portal-ui';
import { lodgingsComponents } from './components/lodgings-components';
import { lodgingTypesComponents } from './components/lodging-types-component';
import { TranslateLoader } from '@ngx-translate/core';
import { LanguageService } from '@skysmack/portal-ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgLodgingSettingsFieldsConfig } from './ng-lodging-settings-fields-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgLodgingsModule,
    PortalUiModule,
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
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    { provide: 'NgLodgingSettingsFieldsConfig', useClass: NgLodgingSettingsFieldsConfig }
  ]
})
export class LodgingsModule {
  constructor(
    public languageService: LanguageService
  ) { }
}
