import { Routes } from '@angular/router';
import { DoorwaysPassCodesIndexComponent } from './doorways-pass-codes-index/doorways-pass-codes-index.component';
import { DoorwaysPassCodesCreateComponent } from './doorways-pass-codes-create/doorways-pass-codes-create.component';
import { DoorwaysPassCodesEditComponent } from './doorways-pass-codes-edit/doorways-pass-codes-edit.component';
import { SettingsComponent } from '@skysmack/portal-settings';
import { RouteData } from '@skysmack/framework';

export const doorwayPassCodesRoutes: Routes = [
  {
    path: '', component: DoorwaysPassCodesIndexComponent,
    children: [
      { path: 'create', component: DoorwaysPassCodesCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: DoorwaysPassCodesEditComponent, pathMatch: 'full' },
      {
        path: 'settings', component: SettingsComponent, pathMatch: 'full', data: {
          fieldsConfigToken: 'NgDoorwayPassCodeSettingsFieldsConfig'
        } as RouteData
      }
    ]
  }
];

export const doorwayPassCodesComponents: any[] = [
  DoorwaysPassCodesIndexComponent,
  DoorwaysPassCodesCreateComponent,
  DoorwaysPassCodesEditComponent,
];

export const doorwayPassCodesEntryComponents = [
];
