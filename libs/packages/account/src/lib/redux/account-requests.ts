import { ChangePassword, ConfirmEmail } from '../models';
import { HttpResponse, HttpErrorResponse } from '@skysmack/framework';
import { Observable } from 'rxjs';

export interface AccountRequests {
    changePassword(packagePath: string, changePassword: ChangePassword): Observable<HttpResponse | HttpErrorResponse>
    confirmEmail(packagePath: string, confirmEmail: ConfirmEmail): Observable<HttpResponse | HttpErrorResponse>
}
