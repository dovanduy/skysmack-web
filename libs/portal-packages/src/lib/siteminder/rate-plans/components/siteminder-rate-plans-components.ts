import { Routes } from '@angular/router';
import { SiteMinderRatePlansIndexComponent } from './siteminder-rate-plans-index/siteminder-rate-plans-index.component';
import { SiteMinderRatePlansCreateComponent } from './siteminder-rate-plans-create/siteminder-rate-plans-create.component';
import { SiteMinderRatePlansEditComponent } from './siteminder-rate-plans-edit/siteminder-rate-plans-edit.component';
import { SiteMinderRatePlansDetailsComponent } from './siteminder-rate-plans-details/siteminder-rate-plans-details.component';
import { SITE_MINDER_RATE_PLANS_AREA_KEY, SITE_MINDER_RATE_PLANS_ADDITIONAL_PATHS } from '@skysmack/packages-siteminder';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const siteminderRatePlansRoutes: Routes = [
  {
    path: 'rate-plans', children: [
      {
        path: '', component: SiteMinderRatePlansIndexComponent, children: [
          { path: 'create', component: SiteMinderRatePlansCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: SiteMinderRatePlansEditComponent, pathMatch: 'full' },
          { path: 'details/:id', component: SiteMinderRatePlansDetailsComponent, pathMatch: 'full' },
        ]
      },
      getFieldsRoutes(SITE_MINDER_RATE_PLANS_AREA_KEY, SITE_MINDER_RATE_PLANS_ADDITIONAL_PATHS)
    ]
  }
];

export const siteminderRatePlansComponents: any[] = [
  SiteMinderRatePlansIndexComponent,
  SiteMinderRatePlansCreateComponent,
  SiteMinderRatePlansEditComponent,
  SiteMinderRatePlansDetailsComponent
];

export const siteminderRatePlansEntryComponents: any[] = [
]
