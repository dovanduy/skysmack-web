import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { lodgingsDoorwaysRoutes } from './lodgings-doorways/components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...lodgingsDoorwaysRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class LodgingsDoorwaysRoutingModule { }
