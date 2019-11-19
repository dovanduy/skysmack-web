import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { webhooksRoutes } from './webhooks/components/webhooks-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...webhooksRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class WebhooksRoutingModule { }
