import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { doorwaysPassCodesRoutes } from './doorways-pass-codes/components/doorways-pass-codes-components';
import { doorwaysOptionsRoutes } from './doorways-options/components/doorways-options-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...doorwaysPassCodesRoutes,
        ...doorwaysOptionsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class DoorwaysPassCodesRoutingModule { }
