import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { corsRoutes } from './cors/components/cors-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...corsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class CorsRoutingModule { }
