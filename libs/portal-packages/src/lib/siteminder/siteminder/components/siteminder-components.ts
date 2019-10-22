import { Routes } from '@angular/router';
import { SiteMinderIndexComponent } from './siteminder-index/siteminder-index.component';
import { SiteMinderTableComponent } from './siteminder-table/siteminder-table.component';
import { SiteminderAvailabilityComponent } from './siteminder-availability/siteminder-availability.component';

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
  SiteminderAvailabilityComponent
];

export const siteminderEntryComponents: any[] = [
  SiteminderAvailabilityComponent
];

