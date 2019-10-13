import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { siteminderRoutes } from './siteminder/components/siteminder-components';
import { DefaultComponent } from '@skysmack/portal-ui';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', component: DefaultComponent, children: [
        ...siteminderRoutes
      ]
    }
  ])],
  exports: [RouterModule]
})
export class SiteMinderRoutingModule { }
