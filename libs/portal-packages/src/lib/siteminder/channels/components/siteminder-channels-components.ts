import { Routes } from '@angular/router';
import { SiteMinderChannelsIndexComponent } from './siteminder-channels-index/siteminder-channels-index.component';
import { SiteMinderChannelsCreateComponent } from './siteminder-channels-create/siteminder-channels-create.component';
import { SiteMinderChannelsEditComponent } from './siteminder-channels-edit/siteminder-channels-edit.component';
import { SiteMinderChannelsDetailsComponent } from './siteminder-channels-details/siteminder-channels-details.component';
import { SITE_MINDER_CHANNELS_AREA_KEY, SITE_MINDER_CHANNELS_ADDITIONAL_PATHS } from '@skysmack/packages-siteminder';
import { getFieldsRoutes } from '@skysmack/portal-fields';

export const siteminderChannelsRoutes: Routes = [
  {
    path: 'channels', children: [
      {
        path: '', component: SiteMinderChannelsIndexComponent, children: [
          { path: 'create', component: SiteMinderChannelsCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: SiteMinderChannelsEditComponent, pathMatch: 'full' }
        ]
      },
      getFieldsRoutes(SITE_MINDER_CHANNELS_AREA_KEY, SITE_MINDER_CHANNELS_ADDITIONAL_PATHS)
    ]
  }
];

export const siteminderChannelsComponents: any[] = [
  SiteMinderChannelsIndexComponent,
  SiteMinderChannelsCreateComponent,
  SiteMinderChannelsEditComponent,
  SiteMinderChannelsDetailsComponent
];

export const siteminderChannelsEntryComponents: any[] = [
  SiteMinderChannelsDetailsComponent
]
