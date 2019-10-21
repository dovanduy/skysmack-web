import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { siteminderRoutes } from './siteminder/components/siteminder-components';
import { DefaultComponent } from '@skysmack/portal-ui';
import { siteminderChannelsRoutes } from './channels/components/siteminder-channels-components';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...siteminderRoutes,
        ...siteminderChannelsRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class SiteMinderRoutingModule { }
