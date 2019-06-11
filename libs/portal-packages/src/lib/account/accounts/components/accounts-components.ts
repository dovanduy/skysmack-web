import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


export const accountsRoutes: Routes = [
    {
        path: '', component: AccountComponent, children: [
            {
                path: 'change-password', component: ChangePasswordComponent
            },
            {
                path: 'confirm-email', component: ConfirmEmailComponent
            },
            {
                path: 'verify-email',
                component: VerifyEmailComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'recover-password',
                component: RecoverPasswordComponent
            }
        ]
    }
];

export const accountsComponents: any[] = [
    AccountComponent,
    ChangePasswordComponent,
    ConfirmEmailComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent
];
