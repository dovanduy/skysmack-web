import { Routes } from '@angular/router';
import { PhoneNumbersIndexComponent } from './phone-numbers-index/phone-numbers-index.component';
import { PhoneNumbersCreateComponent } from './phone-numbers-create/phone-numbers-create.component';
import { PhoneNumbersEditComponent } from './phone-numbers-edit/phone-numbers-edit.component';

export const phoneNumbersRoutes: Routes = [
  {
    path: 'numbers', component: PhoneNumbersIndexComponent, children: [
      { path: 'create', component: PhoneNumbersCreateComponent, pathMatch: 'full' },
      { path: 'edit/:id', component: PhoneNumbersEditComponent, pathMatch: 'full' },
    ],
  }
];

export const phoneNumbersComponents: any[] = [
  PhoneNumbersIndexComponent,
  PhoneNumbersCreateComponent,
  PhoneNumbersEditComponent
];
