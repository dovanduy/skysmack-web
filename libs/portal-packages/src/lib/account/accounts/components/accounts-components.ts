import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountComponent } from './account/account.component';

export const accountsRoutes: Routes = [
    {
        path: '', component: AccountComponent, children: [
            {
                path: 'change-password', component: ChangePasswordComponent
            }
        ]
    }
];

export const accountsComponents: any[] = [
    AccountComponent,
    ChangePasswordComponent
];
