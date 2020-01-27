import { Routes } from '@angular/router';
import { DoorwaysOptionsIndexComponent } from './doorways-options-index/doorways-options-index.component';
import { DoorwaysOptionsCreateComponent } from './doorways-options-create/doorways-options-create.component';
import { DoorwaysOptionsEditComponent } from './doorways-options-edit/doorways-options-edit.component';

export const doorwaysOptionsRoutes: Routes = [
  {
    path: 'options', children: [
      {
        path: '', component: DoorwaysOptionsIndexComponent, children: [
          { path: 'create', component: DoorwaysOptionsCreateComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: DoorwaysOptionsEditComponent, pathMatch: 'full' }
        ]
      }
    ]
  }
];

export const doorwaysOptionsComponents: any[] = [
  DoorwaysOptionsIndexComponent,
  DoorwaysOptionsCreateComponent,
  DoorwaysOptionsEditComponent,
];

export const doorwaysOptionsEntryComponents = [
];
