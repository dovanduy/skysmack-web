import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService, SettingsModule } from '@skysmack/portal-ui';
import { NgIdentitiesModule, NgLodgingReservationsModule } from '@skysmack/ng-packages';
import { PortalUiModule, FieldsModule } from '@skysmack/portal-ui';
import { LodgingReservationsRoutingModule } from './lodging-reservations-routing.module';
import { lodgingReservationsComponents } from './lodging-reservations/lodgings-reservations-components';
import { NgLodgingReservationsSettingsFieldsConfig } from './ng-lodging-reservations-settings-fields-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    LodgingReservationsRoutingModule,
    NgLodgingReservationsModule,
    NgIdentitiesModule,
    FieldsModule,
    SettingsModule
  ],
  declarations: [
    ...lodgingReservationsComponents,
  ],
  providers: [
    LanguageService,
    { provide: 'NgLodgingReservationsSettingsFieldsConfig', useClass: NgLodgingReservationsSettingsFieldsConfig },
  ]
})
export class LodgingReservationsModule {
  constructor() { }
}
