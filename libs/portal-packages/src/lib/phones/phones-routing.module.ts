import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from '@skysmack/portal-ui';
import { phonesRoutes } from './phones/components/phones-components';
import { phoneLogsRoutes } from './phones-logs/components/phone-logs-components';
import { phoneNumbersRoutes } from './phones-numbers/components/phone-numbers-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...phonesRoutes,
        ...phoneLogsRoutes,
        ...phoneNumbersRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class PhonesRoutingModule { }

