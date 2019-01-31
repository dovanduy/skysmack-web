import { Observable } from 'rxjs';
import { ReduxAction, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';
import { GetPackageSuccessPayload } from './../payloads/get-package-success-payload';
import { GetPackagesSuccessPayload } from './../payloads/get-packages-success-payload';
import { HttpErrorResponse } from '@skysmack/framework';

export interface PackagesRequests {
    get(): Observable<ReduxAction<GetPackagesSuccessPayload> | ReduxAction<HttpErrorResponse>>;
    getSingle(action: ReduxAction): Observable<ReduxAction<GetPackageSuccessPayload> | ReduxAction<HttpErrorResponse>>
    getAvailablePackages(): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>>
}
