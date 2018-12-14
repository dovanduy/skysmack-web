import { Observable } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { GetPackageSuccessPayload } from '../payloads/get-package-success-payload';
import { GetPackagesSuccessPayload } from '../payloads/get-packages-success-payload';

export interface PackagesRequests {
    get(): Observable<ReduxAction<GetPackagesSuccessPayload>>;
    getSingle(action: ReduxAction): Observable<ReduxAction<GetPackageSuccessPayload>>
}
