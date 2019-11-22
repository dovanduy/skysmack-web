import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { passCodesRoutes } from './pass-codes/components/pass-codes-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...passCodesRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PassCodesRoutingModule { }
