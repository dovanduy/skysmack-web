import { Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


export const accountsRoutes: Routes = [
    // See identities-components.ts
];

export const accountsComponents: any[] = [
    ChangePasswordComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent
];
