import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { workflowsRoutes } from './workflows/components/workflows-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...workflowsRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class WorkflowsRoutingModule { }
