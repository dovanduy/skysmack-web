import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LanguageService } from '@skysmack/portal-ui';
import { NgIdentitiesModule, NgLodgingReservationsModule } from '@skysmack/ng-packages';
import { PortalUiModule } from '@skysmack/portal-ui';
import { LodgingReservationsRoutingModule } from './lodging-reservations-routing.module';
import { lodgingReservationsComponents } from './lodging-reservations/lodgings-reservations-components';
import { NgLodgingReservationsSettingsFieldsConfig } from './ng-lodging-reservations-settings-fields-config';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { SettingsModule } from '@skysmack/portal-settings';
import { PortalFieldsModule } from '@skysmack/portal-fields';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    LodgingReservationsRoutingModule,
    NgLodgingReservationsModule,
    NgIdentitiesModule,
    PortalFieldsModule,
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
