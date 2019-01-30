import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { basketsRoutes } from './components/baskets-components';

@NgModule({
  imports: [RouterModule.forChild(basketsRoutes)],
  exports: [RouterModule]
})
export class BasketsRoutingModule { }
