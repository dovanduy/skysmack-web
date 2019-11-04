import { Routes } from '@angular/router';
import { SiteMinderLodgingTypeRatePlanChannelsIndexComponent } from './siteminder-lodging-type-rate-plan-channels-index/siteminder-lodging-type-rate-plan-channels-index.component';
import { SiteMinderLodgingTypeRatePlanChannelsCreateComponent } from './siteminder-lodging-type-rate-plan-channels-create/siteminder-lodging-type-rate-plan-channels-create.component';
import { SiteMinderLodgingTypeRatePlanChannelsEditComponent } from './siteminder-lodging-type-rate-plan-channels-edit/siteminder-lodging-type-rate-plan-channels-edit.component';

export const siteminderLodgingTypeRatePlanChannelsRoutes: Routes = [
  {
    path: 'lodging-type-rate-plan-channels', children: [
      {
        path: '', component: SiteMinderLodgingTypeRatePlanChannelsIndexComponent, children: [
          { path: 'create', component: SiteMinderLodgingTypeRatePlanChannelsCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: SiteMinderLodgingTypeRatePlanChannelsEditComponent, pathMatch: 'full' },
        ]
      }
    ]
  }
];

export const siteminderLodgingTypeRatePlanChannelsComponents: any[] = [
  SiteMinderLodgingTypeRatePlanChannelsIndexComponent,
  SiteMinderLodgingTypeRatePlanChannelsCreateComponent,
  SiteMinderLodgingTypeRatePlanChannelsEditComponent,
];

export const siteminderLodgingTypeRatePlanChannelsEntryComponents: any[] = [
]
