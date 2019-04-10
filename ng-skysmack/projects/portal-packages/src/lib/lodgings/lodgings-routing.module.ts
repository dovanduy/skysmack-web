import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingsRoutes } from './lodgings/components/lodgings-components';
import { lodgingTypesRoutes } from './lodging-types/components/lodging-types-component';

@NgModule({
  imports: [RouterModule.forChild([
    ...lodgingsRoutes,
    ...lodgingTypesRoutes
  ])],
  exports: [RouterModule]
})
export class LodgingsRoutingModule { }
