import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { siteminderRoutes } from './siteminder/components/siteminder-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { siteminderChannelsRoutes } from './channels/components/siteminder-channels-components';
import { siteminderRatePlansRoutes } from './rate-plans/components/siteminder-rate-plans-components';
import { siteminderLodgingTypeRatePlanChannelsRoutes } from './lodging-type-rate-plan-channels';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...siteminderRoutes,
        ...siteminderChannelsRoutes,
        ...siteminderRatePlansRoutes,
        ...siteminderLodgingTypeRatePlanChannelsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class SiteMinderRoutingModule { }
