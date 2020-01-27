import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { lodgingsReservationsPassCodesRoutes } from './lodgings-reservations-pass-codes/components/lodgings-reservations-pass-codes-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...lodgingsReservationsPassCodesRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class LodgingsReservationsPassCodesRoutingModule { }
