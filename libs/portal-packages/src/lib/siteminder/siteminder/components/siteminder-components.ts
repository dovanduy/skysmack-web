import { Routes } from '@angular/router';
import { SiteMinderIndexComponent } from './siteminder-index/siteminder-index.component';
import { SiteMinderTableComponent } from './siteminder-table/siteminder-table.component';
import { SiteMinderAvailabilityComponent } from './siteminder-availability/siteminder-availability.component';
import { SiteMinderRateSummaryComponent } from './siteminder-rate-summary/siteminder-rate-summary.component';
import { SiteMinderRateComponent } from './siteminder-rate/siteminder-rate.component';
import { SiteMinderAvailabilityDialogComponent } from './siteminder-availability-dialog/siteminder-availability-dialog.component';
import { SiteMinderRateSummaryDialogComponent } from './siteminder-rate-summary-dialog/siteminder-rate-summary-dialog.component';
import { SiteMinderRateDialogComponent } from './siteminder-rate-dialog/siteminder-rate-dialog.component';
import { SiteMinderRestrictionsComponent } from './siteminder-restrictions/siteminder-restrictions.component';
import { SiteMinderRestrictionsDialogComponent } from './siteminder-restrictions-dialog/siteminder-restrictions-dialog.component';
import { SiteMinderRestrictionsSummaryComponent } from './siteminder-restrictions-summary/siteminder-restrictions-summary.component';
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
  SiteMinderTableComponent,
  SiteMinderAvailabilityComponent,
  SiteMinderAvailabilityDialogComponent,
  SiteMinderRateSummaryComponent,
  SiteMinderRateSummaryDialogComponent,
  SiteMinderRateComponent,
  SiteMinderRateDialogComponent,
  SiteMinderRestrictionsSummaryComponent,
  SiteMinderRestrictionsSummaryDialogComponent,
  SiteMinderRestrictionsComponent,
  SiteMinderRestrictionsDialogComponent
];

export const siteminderEntryComponents: any[] = [
  SiteMinderAvailabilityDialogComponent,
  SiteMinderRateSummaryDialogComponent,
  SiteMinderRateDialogComponent,
  SiteMinderRestrictionsSummaryDialogComponent,
  SiteMinderRestrictionsDialogComponent
];

