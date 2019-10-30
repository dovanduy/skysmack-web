import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { pbx_3cxRoutes } from './components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...pbx_3cxRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PBX_3CXRoutingModule { }
