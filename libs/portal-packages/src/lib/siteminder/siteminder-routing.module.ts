import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { siteminderRoutes } from './siteminder/components/siteminder-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { siteminderChannelsRoutes } from './channels/components/siteminder-channels-components';
import { siteminderRatePlansRoutes } from './rate-plans/components/siteminder-rate-plans-components';
import { siteminderLodgingTypeRatePlanChannelsRoutes } from './lodging-type-rate-plan-channels';
import { siteminderLodgingTypeRatePlansRoutes } from './lodging-type-rate-plans/components/siteminder-lodging-type-rate-plans-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...siteminderRoutes,
        ...siteminderChannelsRoutes,
        ...siteminderRatePlansRoutes,
        ...siteminderLodgingTypeRatePlansRoutes,
        ...siteminderLodgingTypeRatePlanChannelsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class SiteMinderRoutingModule { }
