import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PortalUiModule } from '@skysmack/portal-ui';
import { NgPersonsLodgingReservationsModule } from '@skysmack/ng-persons-lodging-reservations';
import { PersonsLodgingReservationsRoutingModule } from './persons-lodging-reservations-routing.module';
import { NgPersonsLodgingReservationsFieldProvider } from './ng-persons-lodgings-reservations-field-provider';
import { LodgingReservationsTypeId } from '@skysmack/package-types';
import { DynamicFormsModule } from '@skysmack/portal-dynamic-forms';
import { PortalFieldsModule } from '@skysmack/portal-fields';
import { FieldProviders } from '@skysmack/ng-fields';
import { personsLodgingReservationsComponents, personsLodgingReservationsEntryComponents } from './components/persons-lodging-reservations-components';
import { CoalescingComponentFactoryResolver, NgSummaryProviders } from '@skysmack/ng-framework';
import { NgPersonsLodgingReservationsSummaryProvider } from './components/persons-lodging-reservations-summary/ng-persons-lodging-reservations-summary-provider';
import { NgLodgingReservationsPersonsSummaryProvider } from './components/lodging-reservations-persons-summary/ng-lodging-reservations-persons-summary-provider';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PortalUiModule,
    DynamicFormsModule,
    PersonsLodgingReservationsRoutingModule,
    NgPersonsLodgingReservationsModule,
    PortalFieldsModule
  ],
  declarations: [
    ...personsLodgingReservationsComponents
  ],
  entryComponents: [
    ...personsLodgingReservationsEntryComponents
  ],
  providers: []
})
export class PersonsLodgingReservationsModule {
  constructor(
    personsLodgingReservationsSummaryProvider: NgPersonsLodgingReservationsSummaryProvider,
    lodgingReservationsPersonsSummaryProvider: NgLodgingReservationsPersonsSummaryProvider,
    fieldProviders: FieldProviders,
    personsLodgingsReservationsFieldProvider: NgPersonsLodgingReservationsFieldProvider,
    summaryProviders: NgSummaryProviders,
    coalescingResolver: CoalescingComponentFactoryResolver,
    localResolver: ComponentFactoryResolver

  ) {
    fieldProviders.add(LodgingReservationsTypeId, personsLodgingsReservationsFieldProvider);
    coalescingResolver.registerResolver(localResolver);
    summaryProviders
      .add(personsLodgingReservationsSummaryProvider)
      .add(lodgingReservationsPersonsSummaryProvider);
  }
}
