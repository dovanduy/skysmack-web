import { Routes } from '@angular/router';
import { SiteMinderIndexComponent } from './siteminder-index/siteminder-index.component';
import { SiteMinderTableComponent } from './siteminder-table/siteminder-table.component';
import { SiteMinderAvailabilityComponent } from './siteminder-availability/siteminder-availability.component';
import { SiteMinderRateSummaryComponent } from './siteminder-rate-summary/siteminder-rate-summary.component';
import { SiteMinderRateComponent } from './siteminder-rate/siteminder-rate.component';
import { SiteMinderAvailabilityDialogComponent } from './siteminder-availability-dialog/siteminder-availability-dialog.component';
import { SiteMinderRateSummaryDialogComponent } from './siteminder-rate-summary-dialog/siteminder-rate-summary-dialog.component';
import { SiteMinderRateDialogComponent } from './siteminder-rate-dialog/siteminder-rate-dialog.component';

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
  SiteMinderAvailabilityComponent,
  SiteMinderAvailabilityDialogComponent,
  SiteMinderRateSummaryComponent,
  SiteMinderRateSummaryDialogComponent,
  SiteMinderRateComponent,
  SiteMinderRateDialogComponent
];

export const siteminderEntryComponents: any[] = [
  SiteMinderAvailabilityDialogComponent,
  SiteMinderRateSummaryDialogComponent,
  SiteMinderRateDialogComponent
];

