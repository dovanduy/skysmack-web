import { Observable } from 'rxjs';
import { ReduxAction, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';
import { GetPackageSuccessPayload } from './../payloads/get-package-success-payload';
import { HttpErrorResponse } from '@skysmack/framework';

export interface PackagesRequests {
    getSingle(action: ReduxAction): Observable<ReduxAction<GetPackageSuccessPayload> | ReduxAction<HttpErrorResponse>>
    getAvailablePackages(): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>>
}
