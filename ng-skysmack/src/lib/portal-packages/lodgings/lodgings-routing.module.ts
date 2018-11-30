import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingsRoutes } from './components/lodgings-components';

@NgModule({
  imports: [RouterModule.forChild(lodgingsRoutes)],
  exports: [RouterModule]
})
export class LodgingsRoutingModule { }
