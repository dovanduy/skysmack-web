import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { packagesRoutes } from './components/packages-components';

@NgModule({
  imports: [RouterModule.forChild(packagesRoutes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
