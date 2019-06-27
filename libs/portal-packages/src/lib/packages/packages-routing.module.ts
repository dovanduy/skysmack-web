import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { packagesRoutes } from './components/packages-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...packagesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
