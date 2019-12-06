import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { doorwayPassCodesRoutes } from './doorways-pass-codes/components/doorways-pass-codes-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...doorwayPassCodesRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class DoorwaysPassCodesRoutingModule { }
