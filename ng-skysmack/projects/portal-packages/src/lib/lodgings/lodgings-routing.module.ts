import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingsRoutes } from './components/lodgings-components';
import { lodgingTypesRoutes } from './components';

@NgModule({
  imports: [RouterModule.forChild([
    ...lodgingsRoutes,
    ...lodgingTypesRoutes
  ])],
  exports: [RouterModule]
})
export class LodgingsRoutingModule { }
