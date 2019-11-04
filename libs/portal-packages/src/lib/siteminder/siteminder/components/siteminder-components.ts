import { Routes } from '@angular/router';
import { SiteMinderIndexComponent } from './siteminder-index/siteminder-index.component';
import { SiteMinderAvailabilityDialogComponent } from './siteminder-availability-dialog/siteminder-availability-dialog.component';
import { SiteMinderRateSummaryDialogComponent } from './siteminder-rate-summary-dialog/siteminder-rate-summary-dialog.component';
import { SiteMinderRateDialogComponent } from './siteminder-rate-dialog/siteminder-rate-dialog.component';
import { SiteMinderRestrictionsDialogComponent } from './siteminder-restrictions-dialog/siteminder-restrictions-dialog.component';
import { SiteMinderRestrictionsSummaryDialogComponent } from './siteminder-restrictions-summary-dialog/siteminder-restrictions-summary-dialog.component';

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
  SiteMinderAvailabilityDialogComponent,
  SiteMinderRateSummaryDialogComponent,
  SiteMinderRateDialogComponent,
  SiteMinderRestrictionsSummaryDialogComponent,
  SiteMinderRestrictionsDialogComponent
];

export const siteminderEntryComponents: any[] = [
  SiteMinderAvailabilityDialogComponent,
  SiteMinderRateSummaryDialogComponent,
  SiteMinderRateDialogComponent,
  SiteMinderRestrictionsSummaryDialogComponent,
  SiteMinderRestrictionsDialogComponent
];

