import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { doorwaysRoutes } from './doorways/components/doorways-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { doorwayRelationsRoutes } from './doorway-relations/components/doorway-relations-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...doorwaysRoutes,
        ...doorwayRelationsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class DoorwaysRoutingModule { }
