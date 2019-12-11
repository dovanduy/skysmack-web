import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { accessPointsRoutes } from './access-points/components';
import { axisPhysicalAccessControlRoutes } from './axis-physical-access-control/components/axis-physical-access-control-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...axisPhysicalAccessControlRoutes,
        ...accessPointsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class AxisPhysicalAccessControlRoutingModule { }
