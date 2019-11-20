import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { templatesRoutes } from './templates/components/templates-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...templatesRoutes
      ]
    }
  ]
  )],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
