import { Routes } from '@angular/router';
import { LodgingsDoorwaysIndexComponent } from './lodgings-doorways-index/lodgings-doorways-index.component';
import { LodgingsDoorwaysCreateComponent } from './lodgings-doorways-create/lodgings-doorways-create.component';
import { LodgingsDoorwaysEditComponent } from './lodgings-doorways-edit/lodgings-doorways-edit.component';

export const doorwaysPassCodesRoutes: Routes = [
  {
    path: '', component: LodgingsDoorwaysIndexComponent,
    children: [
      { path: 'create', component: LodgingsDoorwaysCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: LodgingsDoorwaysEditComponent, pathMatch: 'full' }
    ]
  }
];

export const doorwaysPassCodesComponents: any[] = [
  LodgingsDoorwaysIndexComponent,
  LodgingsDoorwaysCreateComponent,
  LodgingsDoorwaysEditComponent,
];

export const doorwaysPassCodesEntryComponents = [
];
