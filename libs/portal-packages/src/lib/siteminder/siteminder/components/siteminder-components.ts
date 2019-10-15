import { Routes } from '@angular/router';
import { SiteMinderIndexComponent } from './siteminder-index/siteminder-index.component';
import { SiteMinderTableComponent } from './table-components/siteminder-table/siteminder-table.component';
import { SiteMinderRateplansTopComponent } from './table-components/siteminder-rateplans-top/siteminder-rateplans-top.component';
import { SiteMinderChannelsTopComponent } from './table-components/siteminder-channels-top/siteminder-channels-top.component';

export const siteminderRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: SiteMinderIndexComponent, children: [
          // Possible sidebar components
        ]
      }
    ]
  }
];

export const siteminderComponents: any[] = [
  SiteMinderIndexComponent,
  SiteMinderTableComponent,
  SiteMinderRateplansTopComponent,
  SiteMinderChannelsTopComponent,
];

export const siteminderEntryComponents: any[] = [
];

