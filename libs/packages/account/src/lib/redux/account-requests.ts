import { ChangePassword } from '../models';
import { HttpResponse, HttpErrorResponse } from '@skysmack/framework';
import { Observable } from 'rxjs';

export interface AccountRequests {
    changePassword(packagePath: string, changePassword: ChangePassword): Observable<HttpResponse | HttpErrorResponse>
}
