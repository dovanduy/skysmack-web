import { Routes } from '@angular/router';
import { LodgingsDoorwaysIndexComponent } from './lodgings-doorways-index/lodgings-doorways-index.component';
import { LodgingsDoorwaysCreateComponent } from './lodgings-doorways-create/lodgings-doorways-create.component';

export const lodgingsDoorwaysRoutes: Routes = [
  {
    path: '', component: LodgingsDoorwaysIndexComponent,
    children: [
      { path: 'create', component: LodgingsDoorwaysCreateComponent, pathMatch: 'full' }
    ]
  }
];

export const lodgingsDoorwaysComponents: any[] = [
  LodgingsDoorwaysIndexComponent,
  LodgingsDoorwaysCreateComponent
];

export const lodgingsDoorwaysEntryComponents = [
];
