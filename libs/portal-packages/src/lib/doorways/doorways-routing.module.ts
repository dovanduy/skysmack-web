import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { doorwaysRoutes } from './doorways/components/doorways-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...doorwaysRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class DoorwaysRoutingModule { }
