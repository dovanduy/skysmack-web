import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReservationsPricingsIndexComponent } from './components/reservations-pricings-index/reservations-pricings-index.component';
import { lodgingAllocatedPricesRoutes } from './lodging-allocated-prices/components/lodging-allocated-prices-components';
import { lodgingTypeAllocatedPricesRoutes } from './lodging-type-allocated-prices/components/lodging-type-allocated-prices-components';
import { lodgingPricesRoutes } from './lodging-prices/components/lodging-prices-components';
import { lodgingTypePricesRoutes } from './lodging-type-prices/components/lodging-type-prices-components';

@NgModule({
  imports: [RouterModule.forChild([
    ...[{ path: '', component: ReservationsPricingsIndexComponent }],
    ...lodgingAllocatedPricesRoutes,
    ...lodgingPricesRoutes,
    ...lodgingTypeAllocatedPricesRoutes,
    ...lodgingTypePricesRoutes,
  ]
  )],
  exports: [RouterModule]
})
export class ReservationsPricingsRoutingModule { }
