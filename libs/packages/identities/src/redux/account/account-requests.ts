import { HttpResponse, HttpErrorResponse } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { ChangePassword } from '../../models/change-password';
import { ConfirmEmail } from '../../models/confirm-email';

export interface AccountRequests {
    changePassword(packagePath: string, changePassword: ChangePassword): Observable<HttpResponse | HttpErrorResponse>
    confirmEmail(packagePath: string, confirmEmail: ConfirmEmail): Observable<HttpResponse | HttpErrorResponse>
}
