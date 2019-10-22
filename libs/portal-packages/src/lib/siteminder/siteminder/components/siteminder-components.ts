import { Routes } from '@angular/router';
import { SiteMinderIndexComponent } from './siteminder-index/siteminder-index.component';
import { SiteMinderTableComponent } from './siteminder-table/siteminder-table.component';
import { SiteminderAvailabilityComponent } from './siteminder-availability/siteminder-availability.component';
import { SiteMinderRateSummaryComponent } from './siteminder-rate-summary/siteminder-rate-summary.component';
import { SiteminderRateComponent } from './siteminder-rate/siteminder-rate.component';

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
  SiteminderAvailabilityComponent,
  SiteMinderRateSummaryComponent,
  SiteminderRateComponent
];

export const siteminderEntryComponents: any[] = [
  SiteminderAvailabilityComponent,
  SiteMinderRateSummaryComponent,
  SiteminderRateComponent
];

