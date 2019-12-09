import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { doorwaysPassCodesRoutes } from './lodgings-doorways/components/lodgings-doorways-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...doorwaysPassCodesRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class LodgingsDoorwaysRoutingModule { }
