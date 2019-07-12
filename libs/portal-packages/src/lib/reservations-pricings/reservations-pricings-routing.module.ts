import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { lodgingReservationPriceChangesRoutes } from './lodging-reservation-price-changes/components/lodging-reservation-price-changes-components';
import { lodgingTypeReservationPriceChangesRoutes } from './lodging-type-reservation-price-changes/components/lodging-type-reservation-price-changes-components';
import { lodgingPricesRoutes } from './lodging-prices/components/lodging-prices-components';
import { lodgingTypePricesRoutes } from './lodging-type-prices/components/lodging-type-prices-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...[{ path: '', component: ReservationsPricingsIndexComponent }],
        ...lodgingReservationPriceChangesRoutes,
        ...lodgingPricesRoutes,
        ...lodgingTypeReservationPriceChangesRoutes,
        ...lodgingTypePricesRoutes,
      ]
    }
  ])],
  exports: [RouterModule]
})
export class ReservationsPricingsRoutingModule { }
