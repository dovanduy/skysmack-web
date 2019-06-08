import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

export const accountsRoutes: Routes = [
    {
        path: '', component: AccountComponent, children: [
            {
                path: 'change-password', component: ChangePasswordComponent
            },
            {
                path: 'confirm-email', component: ConfirmEmailComponent
            }
        ]
    }
];

export const accountsComponents: any[] = [
    AccountComponent,
    ChangePasswordComponent,
    ConfirmEmailComponent
];
