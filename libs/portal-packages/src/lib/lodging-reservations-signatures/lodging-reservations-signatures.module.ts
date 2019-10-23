import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PortalUiModule } from '@skysmack/portal-ui';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { SettingsModule } from '@skysmack/portal-settings';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LodgingReservationsSignaturesRoutingModule } from './lodging-reservations-signatures-routing.module';

const material = [
  MatAutocompleteModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    LodgingReservationsSignaturesRoutingModule,
    PortalFieldsModule,
    SettingsModule,
    ...material
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class LodgingReservationsSignaturesModule {
  constructor(
  ) {
  }
}
