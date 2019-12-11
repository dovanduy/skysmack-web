import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { accessPointsRoutes } from './access-points/components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...accessPointsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class AxisPhysicalAccessControlRoutingModule { }
