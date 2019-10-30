import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { phonesRoutes } from './phones/components/phones-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...phonesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PhonesRoutingModule { }
