import { Routes } from '@angular/router';
import { SiteMinderLodgingTypeRatePlansIndexComponent } from './siteminder-lodging-type-rate-plans-index/siteminder-lodging-type-rate-plans-index.component';
import { SiteMinderLodgingTypeRatePlansCreateComponent } from './siteminder-lodging-type-rate-plans-create/siteminder-lodging-type-rate-plans-create.component';
import { SiteMinderLodgingTypeRatePlansEditComponent } from './siteminder-lodging-type-rate-plans-edit/siteminder-lodging-type-rate-plans-edit.component';

export const siteminderLodgingTypeRatePlansRoutes: Routes = [
  {
    path: 'lodging-type-rate-plans', children: [
      {
        path: '', component: SiteMinderLodgingTypeRatePlansIndexComponent, children: [
          { path: 'create', component: SiteMinderLodgingTypeRatePlansCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: SiteMinderLodgingTypeRatePlansEditComponent, pathMatch: 'full' },
        ]
      }
    ]
  }
];

export const siteminderLodgingTypeRatePlansComponents: any[] = [
  SiteMinderLodgingTypeRatePlansIndexComponent,
  SiteMinderLodgingTypeRatePlansCreateComponent,
  SiteMinderLodgingTypeRatePlansEditComponent,
];

export const siteminderLodgingTypeRatePlansEntryComponents: any[] = [
]
