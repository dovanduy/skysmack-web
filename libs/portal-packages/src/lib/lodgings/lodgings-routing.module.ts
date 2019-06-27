import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lodgingsRoutes } from './lodgings/components/lodgings-components';
import { lodgingTypesRoutes } from './lodging-types/components/lodging-types-component';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...lodgingsRoutes,
        ...lodgingTypesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class LodgingsRoutingModule { }
