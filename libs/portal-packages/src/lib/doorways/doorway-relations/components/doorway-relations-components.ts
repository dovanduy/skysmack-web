import { Routes } from '@angular/router';
import { DoorwayRelationsIndexComponent } from './doorway-relations-index/doorway-relations-index.component';
import { DoorwayRelationsCreateComponent } from './doorway-relations-create/doorway-relations-create.component';

export const doorwayRelationsRoutes: Routes = [
  {
    path: 'relations', component: DoorwayRelationsIndexComponent,
    children: [
      { path: 'create', component: DoorwayRelationsCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const doorwayRelationsComponents: any[] = [
  DoorwayRelationsIndexComponent,
  DoorwayRelationsCreateComponent,
];

export const doorwayRelationsEntryComponents = [
];
